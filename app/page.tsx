import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-5">Home</h1>
      <div className="flex flex-col gap-5 max-w-sm mx-auto">
        <Link
          className="w-full text-center bg-green-500 hover:bg-green-600 p-2 rounded-md"
          href="/account/login"
        >
          Login
        </Link>
        <Link
          className=" w-full text-center bg-blue-500 hover:bg-blue-600 p-2 rounded-md"
          href="/account/register"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
