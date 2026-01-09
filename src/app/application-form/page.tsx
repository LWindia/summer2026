// app/application/page.tsx
import ApplicationForm from "@/components/customComponents/application-form/ApplicationForm"

export const metadata = {
  title: 'Application Form | Summer Industrial Training Program',
  description: 'Research based Summer Industrial Training program application form',
}

export default function ApplicationPage() {
  return (
    <main className="min-h-screen bg-white py-12">
      <ApplicationForm />
    </main>
  )
}