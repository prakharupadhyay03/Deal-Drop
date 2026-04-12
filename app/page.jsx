import { createClient } from "@/utils/supabase/server";
import { getProducts } from "./actions";
import DashboardContent from "@/components/DashboardContent";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = user ? await getProducts() : [];

  return <DashboardContent user={user} initialProducts={products} />;
}