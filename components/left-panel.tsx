"use client"

import { Square } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const elements = [
  { name: "Square", icon: Square },
  { name: "Circle", icon: Square },
  { name: "Line", icon: Square },
  { name: "Star", icon: Square },
  { name: "Arrow", icon: Square },
  { name: "Hourglass", icon: Square },
  { name: "Wave", icon: Square },
  { name: "Burst", icon: Square },
  { name: "Spiral", icon: Square },
]

export function LeftPanel() {
  return (
    <div className="w-[310px] border-r bg-background">
      <Tabs defaultValue="featured">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="featured"
            className="rounded-none border-b-2 px-4 py-2 data-[state=active]:border-primary"
          >
            Featured
          </TabsTrigger>
          <TabsTrigger
            value="stickers"
            className="rounded-none border-b-2 px-4 py-2 data-[state=active]:border-primary"
          >
            Stickers
          </TabsTrigger>
          <TabsTrigger
            value="gifs"
            className="rounded-none border-b-2 px-4 py-2 data-[state=active]:border-primary"
          >
            GIFs
          </TabsTrigger>
          <TabsTrigger
            value="emojis"
            className="rounded-none border-b-2 px-4 py-2 data-[state=active]:border-primary"
          >
            Emojis
          </TabsTrigger>
        </TabsList>
        <TabsContent value="featured" className="p-4">
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium">Basics</h3>
              <div className="grid grid-cols-3 gap-2">
                {elements.slice(0, 3).map((element) => (
                  <Card
                    key={element.name}
                    className="flex aspect-square items-center justify-center p-2"
                  >
                    <element.icon className="h-6 w-6 text-gray-600" />
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium">Elements</h3>
              <div className="grid grid-cols-3 gap-2">
                {elements.slice(3).map((element) => (
                  <Card
                    key={element.name}
                    className="flex aspect-square items-center justify-center p-2"
                  >
                    <element.icon className="h-6 w-6 text-gray-600" />
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

