/**
 * @topology_group users
 * @keep_warm
 * @compute_size 1core_512mb
 * 
 * @klotho::execution_unit {
 *   name = "users"
 *   keep_warm = true
 *   compute_size = "1core_512mb"
 * }
 */

/**
 * @capability kv_persist eventually_consistent
 * 
 * @klotho::persist {
 *   eventually_consistent = true
 * }
 */
const users = new Map<string, string>();


export async function getUsers(): Promise<string[]> {
  const keys = await users.keys()
  console.log("users:", keys)
  return [...keys]
}

export async function addUser(u: string) {
  await users.set(u, u)
  console.log("Added user", u)
}
