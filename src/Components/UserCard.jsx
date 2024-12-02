export default function UserCard({ user }) {
  const { avatar_url: url, username } = user;

  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 w-48 m-4">
      <img
        src={`${url}`}
        alt={`Avatar of ${username}`}
        className="w-20 h-20 rounded-lg object-cover mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-800">{username}</h3>
    </div>
  );
}