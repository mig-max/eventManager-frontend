import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-semibold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-4">The page you're looking for does not exist.</p>
        <Link to="/">
          <Button colorScheme="blue" size="md">
            Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
