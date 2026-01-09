import { Zap } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function GitLearningCard() {
  return (
    <Card className="bg-pink-50 border-none shadow-sm max-w-3xl">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-orange-500" />
          <span className="font-medium">Why learn this</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>A code hosting platform for version control and collaboration.</p>

        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" className="bg-pink-200 hover:bg-pink-300 border-none text-gray-800">
            Git Basics
          </Button>
          <Button variant="secondary" className="bg-pink-200 hover:bg-pink-300 border-none text-gray-800">
            Git Commands
          </Button>
          <Button variant="secondary" className="bg-pink-200 hover:bg-pink-300 border-none text-gray-800">
            Clone a Repository
          </Button>
          <Button variant="secondary" className="bg-pink-200 hover:bg-pink-300 border-none text-gray-800">
            Git Branching
          </Button>
          <Button variant="secondary" className="bg-pink-200 hover:bg-pink-300 border-none text-gray-800">
            Merging
          </Button>
          <Button variant="secondary" className="bg-pink-200 hover:bg-pink-300 border-none text-gray-800">
            Git Stash
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

