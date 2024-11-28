"use client"

import dynamic from "next/dynamic";

const StoreLocator = dynamic(() => import("@/components/store-locator"), { ssr: false });

export default function Page() {
    return (
        <div className={"max-w-7xl mx-auto h-screen"}>
            <h1 className="text-3xl font-bold text-gray-900 my-8">Où nous trouver ?</h1>
            <div className={"h-96"}>
                <StoreLocator onSelectStore={(store) => console.log(store)}/>
            </div>
        </div>
    );
}