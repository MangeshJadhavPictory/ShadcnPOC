"use client";

import { useState } from "react";
import {
  AlignCenter,
  Bold,
  ChevronDown,
  Italic,
  List,
  RotateCcw,
  Underline,
  MoreVertical,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function RightPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedFonts, setSelectedFonts] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [fontToDelete, setFontToDelete] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleManageFonts = (value: string) => {
    if (value === "manage") {
      setIsModalOpen(true);
    }
  };

  const handleFontSelect = (fontName: string) => {
    setSelectedFonts((prev) =>
      prev.includes(fontName)
        ? prev.filter((f) => f !== fontName)
        : [...prev, fontName]
    );
  };

  const handleDeleteSelected = () => {
    setSelectedFonts([]);
    setIsMultiSelect(false);
  };

  const handleFileUpload = (files: File[]) => {
    const validFiles = files.filter((file) => {
      const ext = file.name.toLowerCase().split(".").pop();
      return ["ttf", "otf", "woff", "woff2", "zip"].includes(ext || "");
    });

    if (validFiles.length > 0) {
      setUploadedFiles((prev) => [...prev, ...validFiles]);
      console.log("Uploaded files:", validFiles);
    }
  };

  const handleDeleteClick = (fontName: string) => {
    setFontToDelete(fontName);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    // Add your delete logic here
    setShowDeleteDialog(false);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center gap-2 border-b bg-background p-2">
        <Select defaultValue="poppins" onValueChange={handleManageFonts}>
          <SelectTrigger className="w-32 h-8 border-0 bg-muted px-2 text-xs outline-none ring-0 focus:ring-0 ring-offset-0 focus:ring-transparent">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="poppins" className="text-xs">
              Poppins
            </SelectItem>
            <SelectItem value="inter" className="text-xs">
              Inter
            </SelectItem>
            <SelectItem value="roboto" className="text-xs">
              Roboto
            </SelectItem>
            <SelectItem value="manage" className="font-bold text-xs">
              Manage Fonts
            </SelectItem>
          </SelectContent>
        </Select>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-[550px] h-[520px] flex flex-col gap-6">
            {isMultiSelect && selectedFonts.length > 0 && (
              <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 px-[14px] h-[52px] bg-[#121212] rounded-2xl text-white shadow-lg">
                <span className="text-sm text-white/50 mr-3">
                  With selected
                </span>
                <button
                  onClick={handleDeleteSelected}
                  className="h-8 w-[67px] bg-[#F53D6B] rounded-lg text-sm text-white font-medium"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setSelectedFonts([]);
                    setIsMultiSelect(false);
                  }}
                  className="w-8 h-8 ml-2"
                >
                  ✕
                </button>
              </div>
            )}

            <DialogHeader>
              <DialogTitle className="text-[#121212] font-inter text-xl font-semibold leading-[140%]">
                Manage fonts
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col flex-1">
              <div
                className="flex h-[64px] p-[8px] justify-center items-center gap-[10px] self-stretch rounded-[12px] border border-[#D1D1D1] bg-white shadow-[0px_1px_2px_0px_rgba(18,18,23,0.05)]"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.currentTarget.style.borderColor = "#6D28D9";
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.currentTarget.style.borderColor = "#D1D1D1";
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.currentTarget.style.borderColor = "#D1D1D1";
                  const files = Array.from(e.dataTransfer.files);
                  handleFileUpload(files);
                }}
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="text-[#6D28D9]"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4V16M12 16L8 12M12 16L16 12M6 20H18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <div className="text-[#121212] font-inter text-sm font-medium leading-[160%]">
                      Drag & drop files or{" "}
                      <label className="text-[#5939A2] font-inter text-sm font-medium leading-[160%] underline underline-offset-2 cursor-pointer">
                        Browse
                        <input
                          type="file"
                          className="hidden"
                          multiple
                          accept=".ttf,.otf,.woff,.woff2,.zip"
                          onChange={(e) => {
                            if (e.target.files) {
                              handleFileUpload(Array.from(e.target.files));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div className="text-[#6C6C6C] font-inter text-xs font-normal leading-[150%]">
                      Font files (TTF, OTF, WOFF, WOFF2, Zip)
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                {uploadedFiles.length > 0 &&
                  (isMultiSelect ? (
                    <div className="flex flex-col gap-2 p-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex w-full h-[44px] px-2 py-1.5 justify-between items-center rounded-lg bg-white hover:bg-[#F1EDFA]"
                          style={{
                            background:
                              "linear-gradient(0deg, #FFF 0%, #FFF 100%), linear-gradient(0deg, #F1EDFA 0%, #F1EDFA 100%), #F7F7F7",
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded-sm border-gray-300"
                              checked={selectedFonts.includes(file.name)}
                              onChange={() => handleFontSelect(file.name)}
                            />
                            <span className="text-sm">{file.name}</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {file.name.toLowerCase().endsWith(".zip")
                              ? "2 variants"
                              : "1 variant"}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Accordion type="single" collapsible className="w-full">
                      {uploadedFiles.map((file, index) => {
                        const isZip = file.name.toLowerCase().endsWith(".zip");
                        return (
                          <AccordionItem
                            key={index}
                            value={`file-${index}`}
                            className="px-2 border-none"
                          >
                            <div className="flex items-center justify-between h-[46px] group bg-red-500">
                              <AccordionTrigger
                                className="flex-1 gap-2 [&>svg]:order-first no-underline hover:no-underline p-0 h-full"
                                disabled={!isZip}
                              >
                                {file.name}
                              </AccordionTrigger>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 group-hover:opacity-100"
                                onClick={() =>
                                  setUploadedFiles((files) =>
                                    files.filter((_, i) => i !== index)
                                  )
                                }
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2 4H3.33333H14"
                                    stroke="currentColor"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M5.33334 4V2.66667C5.33334 2.31305 5.47381 1.97391 5.72386 1.72386C5.97391 1.47381 6.31305 1.33334 6.66667 1.33334H9.33334C9.68696 1.33334 10.0261 1.47381 10.2761 1.72386C10.5262 1.97391 10.6667 2.31305 10.6667 2.66667V4M12.6667 4V13.3333C12.6667 13.687 12.5262 14.0261 12.2761 14.2761C12.0261 14.5262 11.687 14.6667 11.3333 14.6667H4.66667C4.31305 14.6667 3.97391 14.5262 3.72386 14.2761C3.47381 14.0261 3.33334 13.687 3.33334 13.3333V4H12.6667Z"
                                    stroke="currentColor"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </Button>
                            </div>
                            {isZip && (
                              <AccordionContent className="flex flex-col items-start gap-[10px] px-0 self-stretch">
                                <div className="flex flex-col items-start gap-2 p-2.5 pl-10 bg-gray-100 rounded-lg w-full mx-auto">
                                  {["Font file 1", "Font file 2"].map(
                                    (font) => (
                                      <div
                                        key={font}
                                        className="flex items-center justify-between w-full"
                                      >
                                        <div className="flex items-center space-x-2">
                                          <span className="font-bold text-black text-sm">
                                            {font}
                                          </span>
                                          <span className="text-gray-600 text-xs">
                                            .ttf
                                          </span>
                                        </div>
                                        {!isMultiSelect && (
                                          <div className="relative w-6 h-6 rounded">
                                            <button className="absolute w-6 h-6 p-0.5 bg-transparent">
                                              <div className="absolute w-5 h-5">
                                                {/* Delete icon can go here */}
                                              </div>
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              </AccordionContent>
                            )}
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  ))}

                <div className="flex-1 overflow-hidden mt-4">
                  {isMultiSelect ? (
                    <div className="flex flex-col gap-2 p-2">
                      <div
                        className="flex w-full h-[44px] px-2 py-1.5 justify-between items-center rounded-lg bg-white hover:bg-[#F1EDFA]"
                        style={{
                          background:
                            "linear-gradient(0deg, #FFF 0%, #FFF 100%), linear-gradient(0deg, #F1EDFA 0%, #F1EDFA 100%), #F7F7F7",
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded-sm border-gray-300"
                            checked={selectedFonts.includes("Google Fonts")}
                            onChange={() => handleFontSelect("Google Fonts")}
                          />
                          <span className="text-sm">Google Fonts</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          4 variants
                        </span>
                      </div>
                      <div
                        className="flex w-full h-[44px] px-2 py-1.5 justify-between items-center rounded-lg bg-white hover:bg-[#F1EDFA]"
                        style={{
                          background:
                            "linear-gradient(0deg, #FFF 0%, #FFF 100%), linear-gradient(0deg, #F1EDFA 0%, #F1EDFA 100%), #F7F7F7",
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded-sm border-gray-300"
                            checked={selectedFonts.includes("System Fonts")}
                            onChange={() => handleFontSelect("System Fonts")}
                          />
                          <span className="text-sm">System Fonts</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          2 variants
                        </span>
                      </div>
                    </div>
                  ) : (
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem
                        value="google-fonts"
                        className="px-2 border-none"
                      >
                        <div className="flex items-center justify-between h-[46px] group bg-red-500">
                          <AccordionTrigger className="flex-1 gap-2 [&>svg]:order-first [&>svg]:w-6 [&>svg]:h-6 [&>svg]:p-[5px] no-underline hover:no-underline">
                            Google Fonts
                          </AccordionTrigger>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 group-hover:opacity-100"
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8 8.66667C8.36819 8.66667 8.66667 8.36819 8.66667 8C8.66667 7.63181 8.36819 7.33334 8 7.33334C7.63181 7.33334 7.33333 7.63181 7.33333 8C7.33333 8.36819 7.63181 8.66667 8 8.66667Z"
                                    stroke="currentColor"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M12.6667 8.66667C13.0349 8.66667 13.3333 8.36819 13.3333 8C13.3333 7.63181 13.0349 7.33334 12.6667 7.33334C12.2985 7.33334 12 7.63181 12 8C12 8.36819 12.2985 8.66667 12.6667 8.66667Z"
                                    stroke="currentColor"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3.33333 8.66667C3.70152 8.66667 4 8.36819 4 8C4 7.63181 3.70152 7.33334 3.33333 7.33334C2.96514 7.33334 2.66666 7.63181 2.66666 8C2.66666 8.36819 2.96514 8.66667 3.33333 8.66667Z"
                                    stroke="currentColor"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[84px] flex flex-col items-start py-2 px-0 gap-2">
                              <Button
                                variant="ghost"
                                className="p-0 h-[36px] w-full flex items-center justify-center text-red-600"
                                onClick={() =>
                                  handleDeleteClick("Google Fonts")
                                }
                              >
                                Delete
                              </Button>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <AccordionContent className="flex flex-col items-start gap-[10px] px-0 self-stretch">
                          <div className="flex flex-col items-start gap-2 rounded-lg w-full mx-auto">
                            {["Roboto", "Open Sans"].map((font) => (
                              <div
                                key={font}
                                className="flex items-center justify-between w-full bg-gray-100 h-[36px] pl-9 rounded-lg"
                              >
                                <div className="flex items-center space-x-2 ">
                                  <span className="font-bold text-black text-sm">
                                    {font}
                                  </span>
                                  <span className="text-gray-600 text-xs">
                                    .ttf
                                  </span>
                                </div>
                                {!isMultiSelect && (
                                  <div className="relative w-6 rounded bg-gray-100">
                                    <button className="absolute w-6 h-6 p-0.5 bg-transparent">
                                      <div className="absolute w-5 h-5">
                                        {/* Delete icon can go here */}
                                      </div>
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem
                        value="system-fonts"
                        className="px-2 py-1.5 border-none"
                      >
                        <div className="flex items-center justify-between h-[44px] group bg-red-500">
                          <AccordionTrigger className="flex-1 gap-2 [&>svg]:order-first [&>svg]:w-6 [&>svg]:h-6 [&>svg]:p-[5px] no-underline hover:no-underline">
                            System Fonts
                          </AccordionTrigger>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 group-hover:opacity-100"
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8 8.66667C8.36819 8.66667 8.66667 8.36819 8.66667 8C8.66667 7.63181 8.36819 7.33334 8 7.33334C7.63181 7.33334 7.33333 7.63181 7.33333 8C7.33333 8.36819 7.63181 8.66667 8 8.66667Z"
                                    stroke="currentColor"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M12.6667 8.66667C13.0349 8.66667 13.3333 8.36819 13.3333 8C13.3333 7.63181 13.0349 7.33334 12.6667 7.33334C12.2985 7.33334 12 7.63181 12 8C12 8.36819 12.2985 8.66667 12.6667 8.66667Z"
                                    stroke="currentColor"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3.33333 8.66667C3.70152 8.66667 4 8.36819 4 8C4 7.63181 3.70152 7.33334 3.33333 7.33334C2.96514 7.33334 2.66666 7.63181 2.66666 8C2.66666 8.36819 2.96514 8.66667 3.33333 8.66667Z"
                                    stroke="currentColor"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[84px] flex flex-col items-start py-2 px-0 gap-2">
                              <Button
                                variant="ghost"
                                className="p-0 h-[36px] w-full flex items-center justify-center text-red-600"
                                onClick={() =>
                                  handleDeleteClick("System Fonts")
                                }
                              >
                                Delete
                              </Button>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <AccordionContent className="flex flex-col items-start gap-[10px] px-0 self-stretch">
                          <div className="flex flex-col items-start gap-2 rounded-lg w-full mx-auto">
                            <div className="flex items-center justify-between w-full bg-gray-100 h-[36px] pl-9 rounded-lg">
                              <div className="flex items-center space-x-2  ">
                                <span className="font-bold text-black text-sm">
                                  Bold
                                </span>
                                <span className="text-gray-600 text-xs">
                                  Pictory+Sans_1440_oblique.ttf
                                </span>
                              </div>
                              <div className="relative w-6 h-6 rounded">
                                <button className="absolute w-6 h-6 p-0.5 bg-transparent">
                                  <div
                                    className="absolute w-5 h-5"
                                    style={{
                                      background:
                                        "url('./assets/images/0ec4bc19-36a4-41dc-adc9-a7f7a8a2de5b.png') no-repeat center",
                                      backgroundSize: "cover",
                                    }}
                                  ></div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}
                </div>
              </div>
            </div>

            {!isMultiSelect && (
              <div className="flex justify-between mt-6 h-[40px]">
                <Button
                  variant="secondary"
                  className="text-sm font-medium leading-6 px-3 py-2"
                  onClick={() => setIsMultiSelect(true)}
                >
                  Select multiple
                </Button>
                <Button
                  className="bg-[#5939A2] hover:bg-[#8C6CD5] text-white font-medium text-sm px-3 py-2 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Done
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Select defaultValue="24">
          <SelectTrigger className="w-20 h-8 border-0 bg-muted px-2 text-xs outline-none ring-0 focus:ring-0 ring-offset-0 focus:ring-transparent">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="16">16</SelectItem>
            <SelectItem value="24">24</SelectItem>
            <SelectItem value="32">32</SelectItem>
          </SelectContent>
        </Select>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Underline className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <List className="h-4 w-4" />
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-zinc-50 p-8">
        <div className="aspect-video w-full overflow-hidden rounded-lg border bg-white shadow-sm">
          <div className="relative h-full">
            <img
              src="https://placehold.co/600x400"
              alt="Preview"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="border-t bg-background p-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ChevronDown className="h-4 w-4" />
          </Button>
          <div className="flex gap-2 overflow-auto">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="aspect-video w-24 rounded-sm border bg-muted"
              />
            ))}
          </div>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete font</AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-500">
              Are you sure you want to delete "{fontToDelete}"? This font will
              be removed from any of your existing brands and all text styles
              using this font will also be removed.
              <br />
              <span className="text-sm font-medium">
                Warning: this can not be undone.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-md">
              Keep font
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#F53D6B] hover:bg-[#F53D6B]/90 rounded-md"
              onClick={handleConfirmDelete}
            >
              Delete font
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
