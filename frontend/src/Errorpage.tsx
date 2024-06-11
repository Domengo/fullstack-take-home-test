const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-2 text-gray-600 text-xl">We're sorry, but the page you were looking for doesn't exist.</p>
        <button className="mt-6 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 focus:outline-none" onClick={() => window.location.href='/'}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;