import UserProfile from "@/components/User/UserProfile";
import { fetchAllUserIds } from "@/lib/FetchProduct";

export async function generateStaticParams() {
  try {
    const users = await fetchAllUserIds(); // Should return [{ id: '1' }, { id: '2' }]

    // Return fallback param if no users
    if (!users || users.length === 0) {
      return [{ id: "default" }];
    }

    return users.map((user) => ({
      id: user.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [{ id: "default" }];
  }
}

export default function Page({ params }) {
  return <UserProfile params={params} />;
}
