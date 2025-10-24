export default function TestPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Test Page
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          If you can see this, the basic setup is working correctly.
        </p>
        <div className="mt-8 p-4 bg-green-100 dark:bg-green-900 rounded-lg">
          <p className="text-green-800 dark:text-green-200">
            ✅ React is rendering
          </p>
          <p className="text-green-800 dark:text-green-200">
            ✅ Tailwind CSS is working
          </p>
          <p className="text-green-800 dark:text-green-200">
            ✅ Dark mode is functional
          </p>
        </div>
      </div>
    </div>
  )
}