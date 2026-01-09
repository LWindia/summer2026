"use client"

import { useState, useEffect, useRef } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import toast, { Toaster } from 'react-hot-toast'
import { Loader2, CheckCircle2, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const currentYear = 2000;
const maxYear = 2030;

// Step 1 Schema
const step1Schema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  whatsappNo: z.string()
    .min(10, { message: "WhatsApp number must be 10 digits." })
    .max(10, { message: "WhatsApp number must be 10 digits." })
    .regex(/^[0-9]+$/, "Must contain only numbers"),
  emailAddress: z.string().email({
    message: "Please enter a valid email address.",
  }),
  collegeName: z.string().min(2, {
    message: "College name must be at least 2 characters.",
  }),
})

// Step 2 Schema
const step2Schema = z.object({
  branch: z.string().min(2, {
    message: "Degree must be at least 2 characters.",
  }),
  currentSemester: z.string().refine((val) => {
    const year = parseInt(val);
    return !isNaN(year) && year >= currentYear && year <= maxYear;
  }, {
    message: `Year must be between ${currentYear} and ${maxYear}`,
  }),
  applyingFor: z.string().min(1, {
    message: "Please select what you're applying for.",
  }),
  otherSpecification: z.string().optional(),
  tentativeDates: z.string().min(1, {
    message: "Please select tentative dates.",
  }),
})

// Step 3 Schema
const step3Schema = z.object({
  referenceName: z.string().optional(),
  source: z.string().min(1, {
    message: "Please select how you found us.",
  }),
  query: z.string().optional(),
})

// Complete Form Schema
const formSchema = step1Schema.merge(step2Schema).merge(step3Schema)

type FormValues = z.infer<typeof formSchema>

export function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showOtherSpecification, setShowOtherSpecification] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: "",
      whatsappNo: "",
      emailAddress: "",
      collegeName: "",
      branch: "",
      currentSemester: "",
      applyingFor: "",
      otherSpecification: "",
      tentativeDates: "",
      referenceName: "",
      source: "",
      query: "",
    },
  })

  // Debounce timer for autosave
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastSavedDataRef = useRef<string>('')

  // Auto-save function (silent background save - only shows errors)
  const autoSave = async (step: number, values: Partial<FormValues>, showToast: boolean = false) => {
    try {
      setIsSaving(true)
      console.log(`🔄 [Step ${step}] Auto-saving all accumulated data...`)
      console.log(`🔄 [Step ${step}] Data being sent:`, {
        step,
        isPartial: true,
        fullName: values.fullName,
        whatsappNo: values.whatsappNo,
        emailAddress: values.emailAddress,
        collegeName: values.collegeName,
        branch: values.branch,
        currentSemester: values.currentSemester,
        applyingFor: values.applyingFor,
        tentativeDates: values.tentativeDates,
        source: values.source,
        referenceName: values.referenceName,
        query: values.query,
      })
      
      const payload = {
        ...values,
        step,
        isPartial: true,
      }
      
      console.log(`🔄 [Step ${step}] Full payload:`, payload)
      
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      console.log(`📥 Response for step ${step}:`, data)

      if (!response.ok) {
        throw new Error(data.message || `Auto-save failed with status ${response.status}`)
      }

      // Check if Google Sheets saved successfully
      if (data.googleSheetsSaved) {
        console.log(`✅ Step ${step} saved to Google Sheets successfully (all accumulated data)`)
        // Mark step as completed
        if (!completedSteps.includes(step)) {
          setCompletedSteps([...completedSteps, step])
        }
        // Only show success toast if explicitly requested (e.g., on "Next" button)
        if (showToast) {
          toast.success(`Step ${step} saved successfully!`, { duration: 2000 })
        }
      } else {
        console.warn(`⚠️ Step ${step} API call succeeded but Google Sheets save failed:`, data.googleSheetsError)
        // Still mark as completed since API call succeeded
        if (!completedSteps.includes(step)) {
          setCompletedSteps([...completedSteps, step])
        }
        // Always show error toast
        const errorMessage = data.googleSheetsError || 'Unknown error';
        const is403Error = errorMessage.includes('403') || errorMessage.includes('Access denied');
        
        if (is403Error) {
          toast.error(`Step ${step} saved locally but Google Sheets access denied. Please check the Google Apps Script deployment settings.`, {
            duration: 8000,
          });
        } else {
          toast.error(`Step ${step} saved locally but failed to sync to Google Sheets. Please try again.`, {
            duration: 5000,
          });
        }
      }
    } catch (error) {
      console.error(`❌ Auto-save error for step ${step}:`, error)
      // Always show error toast
      toast.error(`Failed to save step ${step}. Please check your connection and try again.`, {
        duration: 5000,
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Save data when step changes (ensures step 1 data is saved when moving to step 2)
  useEffect(() => {
    // Skip on initial mount
    const allValues = form.getValues()
    const hasAnyData = allValues.fullName || allValues.whatsappNo || allValues.emailAddress || allValues.collegeName ||
                      allValues.branch || allValues.currentSemester || allValues.applyingFor || allValues.tentativeDates ||
                      allValues.source || allValues.referenceName || allValues.query
    
    if (!hasAnyData) return

    // When step changes to 2 or 3, ensure we save all accumulated data
    if (currentStep === 2 || currentStep === 3) {
      const hasStep1Data = allValues.fullName || allValues.whatsappNo || allValues.emailAddress || allValues.collegeName
      const hasStep2Data = allValues.branch || allValues.currentSemester || allValues.applyingFor || allValues.tentativeDates
      const hasStep3Data = allValues.source || allValues.referenceName || allValues.query

      // Determine which step to save based on available data
      let stepToSave = currentStep
      if (hasStep3Data) stepToSave = 3
      else if (hasStep2Data) stepToSave = 2
      else if (hasStep1Data) stepToSave = 1

      // Only save if we have meaningful data and it's different from last save
      const currentDataHash = JSON.stringify(allValues)
      if (stepToSave > 0 && (hasStep1Data || hasStep2Data || hasStep3Data) && currentDataHash !== lastSavedDataRef.current) {
        console.log(`🔄 Step changed to ${currentStep}, saving all accumulated data (step ${stepToSave}):`, allValues)
        console.log(`🔄 Step 1 fields check:`, {
          fullName: allValues.fullName,
          whatsappNo: allValues.whatsappNo,
          emailAddress: allValues.emailAddress,
          collegeName: allValues.collegeName
        })
        autoSave(stepToSave, allValues, false) // Silent save on step change
        lastSavedDataRef.current = currentDataHash
      }
    }
  }, [currentStep]) // Trigger when step changes

  // Auto-save on field changes (debounced) - saves all accumulated data
  useEffect(() => {
    const subscription = form.watch((values) => {
      // Clear existing timer
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current)
      }

      // Check if we have any meaningful data
      const hasStep1Data = values.fullName || values.whatsappNo || values.emailAddress || values.collegeName
      const hasStep2Data = values.branch || values.currentSemester || values.applyingFor || values.tentativeDates
      const hasStep3Data = values.source || values.referenceName || values.query

      // Only save if we have at least Step 1 data
      if (hasStep1Data || hasStep2Data || hasStep3Data) {
        // Create a hash of current data to avoid duplicate saves
        const dataHash = JSON.stringify(values)
        
        // Debounce: wait 3 seconds after last change before saving
        autosaveTimerRef.current = setTimeout(() => {
          const allValues = form.getValues()
          const currentDataHash = JSON.stringify(allValues)
          
          // Only save if data has changed
          if (currentDataHash !== lastSavedDataRef.current && (allValues.fullName || allValues.whatsappNo || allValues.emailAddress)) {
            // Determine step based on current step and available data
            let saveStep = currentStep
            if (hasStep3Data) saveStep = 3
            else if (hasStep2Data) saveStep = 2
            else if (hasStep1Data) saveStep = 1
            
            console.log(`🔄 Auto-saving after field change (step ${saveStep}):`, allValues)
            autoSave(saveStep, allValues, false) // Silent background save
            lastSavedDataRef.current = currentDataHash
          }
        }, 3000) // 3 second delay after user stops typing
      }
    })

    return () => {
      subscription.unsubscribe()
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current)
      }
    }
  }, [form, currentStep])

  // Validate and move to next step
  const handleNext = async () => {
    let isValid = false

    if (currentStep === 1) {
      isValid = await form.trigger(['fullName', 'whatsappNo', 'emailAddress', 'collegeName'])
    } else if (currentStep === 2) {
      isValid = await form.trigger(['branch', 'currentSemester', 'applyingFor', 'tentativeDates'])
    } else if (currentStep === 3) {
      isValid = await form.trigger(['source'])
    }

    if (isValid) {
      // Get ALL accumulated form data (from all steps filled so far)
      const allFormValues = form.getValues()
      console.log(`💾 [Step ${currentStep}] Form values before saving:`, allFormValues)
      console.log(`💾 [Step ${currentStep}] Step 1 fields:`, {
        fullName: allFormValues.fullName,
        whatsappNo: allFormValues.whatsappNo,
        emailAddress: allFormValues.emailAddress,
        collegeName: allFormValues.collegeName
      })
      
      // Determine which step to save based on available data
      const hasStep1Data = allFormValues.fullName || allFormValues.whatsappNo || allFormValues.emailAddress || allFormValues.collegeName
      const hasStep2Data = allFormValues.branch || allFormValues.currentSemester || allFormValues.applyingFor || allFormValues.tentativeDates
      const hasStep3Data = allFormValues.source || allFormValues.referenceName || allFormValues.query
      
      let stepToSave = currentStep
      if (hasStep3Data) stepToSave = 3
      else if (hasStep2Data) stepToSave = 2
      else if (hasStep1Data) stepToSave = 1
      
      // Save ALL accumulated data BEFORE moving to next step
      // This ensures step 1 data is saved when moving to step 2
      console.log(`💾 Saving step ${stepToSave} data (includes all previous steps) before moving to step ${currentStep + 1}`)
      await autoSave(stepToSave, allFormValues, true) // Show toast on "Next" button click
      
      // Update last saved data hash
      lastSavedDataRef.current = JSON.stringify(allFormValues)
      
      if (currentStep < 3) {
        // Move to next step
        const nextStep = currentStep + 1
        setCurrentStep(nextStep)
        
        // Also save again after step change to ensure data is captured
        setTimeout(async () => {
          const updatedValues = form.getValues()
          const updatedStep = hasStep3Data ? 3 : (hasStep2Data ? 2 : 1)
          if (updatedStep >= nextStep) {
            console.log(`💾 Additional save after step change to ${nextStep}`)
            await autoSave(updatedStep, updatedValues, false) // Silent save
          }
        }, 1000)
      } else {
        // Final submission
        await onSubmit(form.getValues())
      }
    }
  }

  // Move to previous step
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Final submission
  async function onSubmit(values: FormValues) {
    const submissionPromise = new Promise(async (resolve, reject) => {
      try {
        setIsSubmitting(true)
        const response = await fetch('/api/submit-application', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...values,
            step: 3,
            isPartial: false,
          }),
        })

        const data = await response.json()
        console.log('📥 Final submission response:', data)

        if (!response.ok) {
          throw new Error(data.message || 'Submission failed')
        }

        // Check if Google Sheets saved successfully
        if (data.googleSheetsSaved) {
          console.log('✅ Application saved to Google Sheets successfully')
          // Reset form on success
          form.reset()
          setShowOtherSpecification(false)
          setCurrentStep(1)
          setCompletedSteps([])
          resolve('Application submitted successfully!')
          toast.success("Application submitted successfully!")
        } else {
          console.warn('⚠️ Application API call succeeded but Google Sheets save failed:', data.googleSheetsError)
          // Still reset form but show warning
          form.reset()
          setShowOtherSpecification(false)
          setCurrentStep(1)
          setCompletedSteps([])
          resolve('Application submitted, but there was an issue saving to Google Sheets. Please contact support.')
          toast.error(`Application submitted, but failed to sync to Google Sheets. ${data.googleSheetsError || ''}`, {
            duration: 8000,
          })
        }
      } catch (error) {
        console.error('Submission error:', error)
        reject(error instanceof Error ? error.message : 'Failed to submit application')
      } finally {
        setIsSubmitting(false)
      }
    })

    toast.promise(
      submissionPromise,
      {
        loading: 'Submitting application...',
        error: (error) => error.toString(),
      },
      {
        position: 'top-center',
        duration: 4000,
      }
    )
  }

  // Watch for applyingFor changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'applyingFor' && value.applyingFor === 'others') {
        setShowOtherSpecification(true)
      } else if (name === 'applyingFor' && value.applyingFor !== 'others') {
        setShowOtherSpecification(false)
        form.setValue('otherSpecification', '')
      }
    })
    return () => subscription.unsubscribe()
  }, [form])

  const steps = [
    { number: 1, title: 'Personal Details' },
    { number: 2, title: 'Academic & Program Details' },
    { number: 3, title: 'Reference & Queries' },
  ]

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Summer Industrial Training Application Form</h1>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          Become a part of one & only research based the Summer Industrial Training Program of India
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-10 bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1 relative">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all shadow-sm",
                  currentStep === step.number
                    ? "bg-red-600 border-red-600 text-white scale-110"
                    : completedSteps.includes(step.number)
                    ? "bg-green-500 border-green-500 text-white"
                    : "bg-white border-gray-300 text-gray-400"
                )}>
                  {completedSteps.includes(step.number) ? (
                    <CheckCircle2 className="w-7 h-7" />
                  ) : (
                    <span className="font-bold text-lg">{step.number}</span>
                  )}
                </div>
                <div className="mt-3 text-center max-w-[140px]">
                  <p className={cn(
                    "text-sm font-semibold",
                    currentStep === step.number ? "text-red-600" : completedSteps.includes(step.number) ? "text-green-600" : "text-gray-500"
                  )}>
                    {step.title}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "h-1 flex-1 mx-4 transition-all rounded-full",
                  completedSteps.includes(step.number + 1) ? "bg-green-500" : currentStep > step.number ? "bg-red-200" : "bg-gray-200"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-lg shadow-sm p-6 md:p-8 border border-gray-100">
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Details</h2>
                <p className="text-sm text-gray-500">Please provide your basic identity and contact information</p>
              </div>

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        {...field} 
                        disabled={isSubmitting || isSaving}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="whatsappNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Number *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your WhatsApp number" 
                        {...field} 
                        disabled={isSubmitting || isSaving}
                        maxLength={10}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="Enter your email address" 
                        {...field} 
                        disabled={isSubmitting || isSaving}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="collegeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College Name *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your college name" 
                        {...field} 
                        disabled={isSubmitting || isSaving}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 2: Academic & Program Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Academic & Program Details</h2>
                <p className="text-sm text-gray-500">Please provide your education background and training preferences</p>
              </div>

              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Degree *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your degree (e.g., B.Tech, MCA)" 
                        {...field} 
                        disabled={isSubmitting || isSaving}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentSemester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year of Passing Out *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder={`Enter your passing year (${currentYear}-${maxYear})`}
                        {...field}
                        min={currentYear}
                        max={maxYear}
                        disabled={isSubmitting || isSaving}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="applyingFor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Applying For *</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        setShowOtherSpecification(value === "others");
                        if (value !== "others") {
                          form.setValue("otherSpecification", "");
                        }
                      }}
                      defaultValue={field.value}
                      disabled={isSubmitting || isSaving}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select program" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dataScienceMLAI">Data Science with Machine Learning & AI</SelectItem>
                        <SelectItem value="fullstackWebDev">Full-stack web development</SelectItem>
                        <SelectItem value="dataAnalytics">Data Analytics</SelectItem>
                        <SelectItem value="salesforce">Salesforce</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {showOtherSpecification && (
                <FormField
                  control={form.control}
                  name="otherSpecification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please Specify *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your program specification"
                          {...field}
                          disabled={isSubmitting || isSaving}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="tentativeDates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tentative Training Dates *</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={isSubmitting || isSaving}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select dates" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="may2026">May 2026</SelectItem>
                        <SelectItem value="june2026">June 2026</SelectItem>
                        <SelectItem value="july2026">July 2026</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 3: Reference & Queries */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Reference & Queries</h2>
                <p className="text-sm text-gray-500">Please provide any additional information or queries</p>
              </div>

              <FormField
                control={form.control}
                name="referenceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reference Name (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter reference name (optional)" 
                        {...field} 
                        disabled={isSubmitting || isSaving}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Where Did You Get to Know About Us? *</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={isSubmitting || isSaving}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="friend">Friend</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Any Query (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your query here (optional)"
                        className="resize-none"
                        {...field}
                        disabled={isSubmitting || isSaving}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1 || isSubmitting || isSaving}
              className="w-auto min-w-[120px] border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {isSaving && (
                <span className="text-sm text-gray-500 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </span>
              )}
            </div>

            <Button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting || isSaving}
              className={cn(
                "w-auto min-w-[140px] bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md hover:shadow-lg transition-all",
                isSubmitting && "opacity-50 cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </div>
              ) : currentStep === 3 ? (
                "Submit Application"
              ) : (
                "Next Step"
              )}
            </Button>
          </div>
        </form>
      </Form>

      {/* Contact Information */}
      <p className="text-sm text-center mt-6 text-gray-600">
        Note: In case of any query or issue feel free to connect with us on{" "}
        <span className="font-bold">+9193510 09002</span> or email us at{" "}
        <span className="text-red-600">Preeti@lwindia.com</span>
      </p>
    </div>
  )
}

export default ApplicationForm;
