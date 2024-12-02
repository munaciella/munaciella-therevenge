import SignIn from "./SignIn";
import UserList from "../Components/UsersList";

export default function LoginPage() {
  return (
    <section className="flex flex-col items-center text-gray-900 dark:text-gray-100">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
        <SignIn />
      </div>
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <UserList />
      </div>
    </section>
  );
}