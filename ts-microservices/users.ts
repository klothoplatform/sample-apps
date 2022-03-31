/**
 * 
 * @klotho::execution_unit {
 *   name = "microsrv-users"
 *   keep_warm = true
 *  [size]
 *   mem_mb = 512
 * }
 */

// @klotho::persist
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
