export default function DofusDashboardFormContent() {
    return (
        <>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm mb-2"
                    htmlFor="dofusinvoker"
                >
                    DofusInvoker.swf:
                </label>
                <input
                    className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    type="text"
                    id="dofusinvoker"
                    required
                    placeholder="Enter DofusInvoker.swf"
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm mb-2"
                    htmlFor="protocol"
                >
                    Protocol:
                </label>
                <input
                    className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    type="text"
                    id="protocol"
                    required
                    placeholder="Enter protocol location"
                />
            </div>
        </>
    );
}
