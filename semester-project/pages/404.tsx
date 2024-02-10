import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const goToHome = () => {
    router.push('/');
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-center px-4">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-500 dark:text-gray-400">Sorry, the page you are looking for does not exist. Here are some helpful links:</p>
      <div className="flex flex-col sm:flex-row items-center mt-6 gap-3">
        <button 
          onClick={goBack}
          className="flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180 inline-block align-text-bottom">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          <span>Go back</span>
        </button>
        <button 
          onClick={goToHome}
          className="px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
        >
          Take me home
        </button>
      </div>
    </section>
  )
}