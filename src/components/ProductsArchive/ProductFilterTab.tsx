import { useState, useEffect } from 'react'
import {ChevronDown, ChevronUp} from "lucide-react";

interface FilterTabProps {
    title: string
    slug: string
    items: string[]
    setFilters: (slug: string, items: string[]) => void
}

export default function ProductFilterTab({ title, slug, items, setFilters }: FilterTabProps) {
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setFilters(slug, selectedItems)
    }, [selectedItems])

    return (
        <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full text-left bg-white hover:bg-gray-50 p-4 flex justify-between items-center transition-colors duration-150 ease-in-out"
            >
                <span className="font-medium text-gray-900">{title}</span>
                {open ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
            </button>
            {open && (
                <div className="bg-white p-4 border-t border-gray-200">
                    <div className="space-y-2">
                        {items.map((item) => (
                            <div key={item} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`${slug}-${item}`}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    checked={selectedItems.includes(item)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedItems([...selectedItems, item])
                                        } else {
                                            setSelectedItems(selectedItems.filter((i) => i !== item))
                                        }
                                    }}
                                />
                                <label
                                    htmlFor={`${slug}-${item}`}
                                    className="ml-2 text-sm text-gray-700 cursor-pointer"
                                >
                                    {item}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
