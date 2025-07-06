export const pseudoExplain = {
  "pair sum problem": {
    explanation: "Use two pointers on sorted array.\n Move inward based on whether the sum is less than or greater than the target.",
    pseudocode: `sort(arr)
si = 0, ei = arr.length - 1
while si < ei:
  sum = arr[si] + arr[ei]
  if sum == target:
    return [si, ei]
  else if sum < target:
    si += 1
  else:
    ei -= 1
return [-1, -1]`
  },

  "stock buy & sell": {
    explanation: "Track lowest price so far.\n At each day, compute profit if sold today, and update max profit.",
    pseudocode: `minPrice = prices[0]
maxProfit = 0
for i = 1 to prices.length - 1:
  profit = prices[i] - minPrice
  maxProfit = max(maxProfit, profit)
  minPrice = min(minPrice, prices[i])
return maxProfit`
  },

  "container with most water": {
    explanation: "Use two pointers from both ends.\n Move the pointer with smaller height to maximize area.",
    pseudocode: `si = 0, ei = height.length - 1
maxWater = 0
while si < ei:
  height = min(height[si], height[ei])
  width = ei - si
  area = height * width
  maxWater = max(maxWater, area)
  if height[si] < height[ei]:
    si += 1
  else:
    ei -= 1
return maxWater`
  },

  "product of array except itself": {
    explanation: "Build prefix and suffix products separately without using division.",
    pseudocode: `n = nums.length
prefix = [1] * n
suffix = [1] * n
for i = 1 to n-1:
  prefix[i] = prefix[i-1] * nums[i-1]
for i = n-2 to 0:
  suffix[i] = suffix[i+1] * nums[i+1]
for i = 0 to n-1:
  result[i] = prefix[i] * suffix[i]
return result`
  },

  "search in rotated sorted array": {
    explanation: "Apply binary search and detect which half is sorted in every iteration.",
    pseudocode: `si = 0, ei = arr.length - 1
while si <= ei:
  mid = (si + ei) / 2
  if arr[mid] == target:
    return mid
  if arr[si] <= arr[mid]:
    if arr[si] <= target < arr[mid]:
      ei = mid - 1
    else:
      si = mid + 1
  else:
    if arr[mid] < target <= arr[ei]:
      si = mid + 1
    else:
      ei = mid - 1
return -1`
  },

  "peak index in mountain array": {
    explanation: "Binary search for the index where the peak element is greater than neighbors.",
    pseudocode: `si = 1, ei = arr.length - 2
while si <= ei:
  mid = (si + ei) / 2
  if arr[mid] > arr[mid-1] and arr[mid] > arr[mid+1]:
    return mid
  else if arr[mid] < arr[mid+1]:
    si = mid + 1
  else:
    ei = mid - 1`
  },

  "single element in sorted array": {
    explanation: "Binary search where the single element breaks the pairing pattern.",
    pseudocode: `si = 0, ei = nums.length - 1
while si < ei:
  mid = (si + ei) / 2
  if mid % 2 == 1:
    mid -= 1
  if nums[mid] == nums[mid+1]:
    si = mid + 2
  else:
    ei = mid
return nums[si]`
  },

  "book allocation problem": {
    explanation: "Binary search on answer.\n Check if mid can be max pages assigned using given students.",
    pseudocode: `si = max(pages), ei = sum(pages)
while si <= ei:
  mid = (si + ei) / 2
  if isPossible(mid):
    ans = mid
    ei = mid - 1
  else:
    si = mid + 1
return ans

function isPossible(limit):
  count = 1, total = 0
  for page in A:
    if total + page > limit:
      count += 1
      total = page
    else:
      total += page
  return count <= M`
  },

  "sort an array with 0s 1s and 2s": {
    explanation: "Use Dutch National Flag algorithm.\n Track positions of 0s and 2s while iterating.",
    pseudocode: `low = 0, mid = 0, high = n - 1
while mid <= high:
  if arr[mid] == 0:
    swap(arr[mid], arr[low])
    mid += 1
    low += 1
  else if arr[mid] == 1:
    mid += 1
  else:
    swap(arr[mid], arr[high])
    high -= 1`
  },

  "merge two sorted arrays": {
    explanation: "Use two pointers to merge sorted arrays into a result array.",
    pseudocode: `i = 0, j = 0
while i < arr1.length and j < arr2.length:
  if arr1[i] <= arr2[j]:
    result.push(arr1[i])
    i += 1
  else:
    result.push(arr2[j])
    j += 1
append remaining from arr1 and arr2`
  },

  "next permutation": {
    explanation: "Find first decreasing point from end, swap it with next greater element, then reverse suffix.",
    pseudocode: `i = n - 2
while i >= 0 and nums[i] >= nums[i+1]:
  i -= 1
if i >= 0:
  j = n - 1
  while nums[j] <= nums[i]:
    j -= 1
  swap(nums[i], nums[j])
reverse(nums, i+1, n-1)`
  },

  "valid palindrome": {
    explanation: "Use two pointers, skip non-alphanumerics, compare characters ignoring case.",
    pseudocode: `si = 0, ei = s.length - 1
while si < ei:
  if s[si] not alphanumeric:
    si += 1
  else if s[ei] not alphanumeric:
    ei -= 1
  else if lower(s[si]) != lower(s[ei]):
    return false
  else:
    si += 1
    ei -= 1
return true`
  },

  "remove all occurances": {
    explanation: "Iterate through the string, only keep characters not matching target.",
    pseudocode: `result = ""
for ch in s:
  if ch != target:
    result += ch
return result`
  },

  "permutation in string": {
    explanation: "Sliding window of s1 length.\n Compare character counts with s1.",
    pseudocode: `freq1 = count(s1)
for i in 0 to s2.length - s1.length:
  freq2 = count(s2[i to i+s1.length])
  if freq1 == freq2:
    return true
return false`
  },

  "reverse words in a string": {
    explanation: "Split the string by spaces, reverse the array, and join it back.",
    pseudocode: `words = split(s)
words = reverse(words)
return join(words)`
  },

  "string compression": {
    explanation: "Count consecutive characters.\n Store character followed by count.",
    pseudocode: `i = 0
while i < chars.length:
  ch = chars[i], count = 1
  while i+1 < chars.length and chars[i+1] == ch:
    i += 1
    count += 1
  result.append(ch)
  if count > 1:
    result.append(count)
  i += 1`
  },

  "search in a 2d matrix": {
    explanation: "Binary search treating 2D matrix as 1D array.",
    pseudocode: `m = rows, n = columns
si = 0, ei = m*n - 1
while si <= ei:
  mid = (si + ei) / 2
  value = matrix[mid/n][mid%n]
  if value == target:
    return true
  else if value < target:
    si = mid + 1
  else:
    ei = mid - 1
return false`
  },

  "reverse a linked list": {
    explanation: "Iterate and reverse pointers of each node.",
    pseudocode: `prev = null
curr = head
while curr:
  next = curr.next
  curr.next = prev
  prev = curr
  curr = next
return prev`
  },

  "middle of a linked list": {
    explanation: "Use slow and fast pointers.\n Slow will be at middle when fast reaches end.",
    pseudocode: `slow = fast = head
while fast and fast.next:
  slow = slow.next
  fast = fast.next.next
return slow`
  },

  "detect and remove cycle": {
    explanation: "Use Floyd’s cycle detection.\n Reset one pointer to head and find the node before cycle start.",
    pseudocode: `slow = fast = head
while fast and fast.next:
  slow = slow.next
  fast = fast.next.next
  if slow == fast:
    break
if no cycle:
  return
slow = head
while slow.next != fast.next:
  slow = slow.next
  fast = fast.next
fast.next = null`
  },

  "merge two sorted lists": {
    explanation: "Iterate both lists and merge in increasing order using dummy node.",
    pseudocode: `dummy = new Node(0)
tail = dummy
while l1 and l2:
  if l1.val < l2.val:
    tail.next = l1
    l1 = l1.next
  else:
    tail.next = l2
    l2 = l2.next
  tail = tail.next
tail.next = l1 or l2
return dummy.next`
  },

  "lru cache": {
    explanation: "Use hashmap for O(1) access and doubly linked list for O(1) update order.",
    pseudocode: `get(key):
  if key not in map:
    return -1
  move node to front
  return node.value

put(key, value):
  if key in map:
    update node value and move to front
  else:
    if size == capacity:
      remove LRU node from back
    add new node to front`
  },

  "traversals of binary tree": {
    explanation: "Traverse level by level using a queue.\n Add children to queue.",
    pseudocode: `queue = [root]
while queue not empty:
  level = []
  for each node in queue:
    add node.val to level
    add children to next level
  result.append(level)`
  },

  "diameter of binary tree": {
    explanation: "At each node, calculate height of left and right.\n Track max diameter.",
    pseudocode: `function dfs(node):
  if not node:
    return 0
  left = dfs(node.left)
  right = dfs(node.right)
  diameter = max(diameter, left + right)
  return 1 + max(left, right)`
  },

  "longest common subsequence": {
    explanation: "Use DP table to compare prefixes of both strings.",
    pseudocode: `dp = 2D array of size m+1 x n+1
for i = 1 to m:
  for j = 1 to n:
    if s1[i-1] == s2[j-1]:
      dp[i][j] = 1 + dp[i-1][j-1]
    else:
      dp[i][j] = max(dp[i-1][j], dp[i][j-1])
return dp[m][n]`
  },

  "coin change": {
    explanation: "Use bottom-up DP.\n Build min coins for each amount up to target.",
    pseudocode: `dp = [Infinity] * (amount+1)
dp[0] = 0
for coin in coins:
  for i = coin to amount:
    dp[i] = min(dp[i], 1 + dp[i - coin])
return dp[amount] or -1`
  },

  "huffman encoding": {
    explanation: "Build min heap of frequencies.\n Combine two lowest nodes until one root remains.",
    pseudocode: `for each char and freq:
  create node and push to minHeap
while heap.size > 1:
  left = pop heap
  right = pop heap
  merge = new node(left.freq + right.freq)
  merge.left = left
  merge.right = right
  push merge to heap
traverse tree to get binary codes`
  },

  "cycle detection in undirected graph": {
    explanation: "Use DFS and track parent of each node.\n If neighbor is visited and not parent, cycle exists.",
    pseudocode: `function dfs(node, parent):
  mark node as visited
  for neighbor in graph[node]:
    if not visited[neighbor]:
      if dfs(neighbor, node):
        return true
    else if neighbor != parent:
      return true
return false`
  },
  "bubble sort": {
    explanation: "Repeatedly swap adjacent elements if they are in the wrong order.\nKeep shrinking the range after each pass.",
    pseudocode: `for i = 0 to n - 1:
  for j = 0 to n - i - 2:
    if arr[j] > arr[j + 1]:
      swap(arr[j], arr[j + 1])`
  },

  "selection sort": {
    explanation: "Select the minimum element from the unsorted part and place it at the beginning.",
    pseudocode: `for i = 0 to n - 1:
  minIndex = i
  for j = i + 1 to n - 1:
    if arr[j] < arr[minIndex]:
      minIndex = j
  swap(arr[i], arr[minIndex])`
  },

  "insertion sort": {
    explanation: "Insert each element into its correct position in the sorted part of the array.",
    pseudocode: `for i = 1 to n - 1:
  key = arr[i]
  j = i - 1
  while j >= 0 and arr[j] > key:
    arr[j + 1] = arr[j]
    j -= 1
  arr[j + 1] = key`
  },

  "merge sort": {
    explanation: "Divide the array into halves, sort recursively, and merge them.",
    pseudocode: `function mergeSort(arr):
  if arr.length <= 1:
    return arr
  mid = arr.length // 2
  left = mergeSort(arr[0:mid])
  right = mergeSort(arr[mid:])
  return merge(left, right)`
  },

  "quick sort": {
    explanation: "Pick a pivot, partition array into two halves, and recursively sort both halves.",
    pseudocode: `function quickSort(arr, low, high):
  if low < high:
    pi = partition(arr, low, high)
    quickSort(arr, low, pi - 1)
    quickSort(arr, pi + 1, high)`
  },

  "heap sort": {
    explanation: "Build a max heap and repeatedly extract the max element and heapify.",
    pseudocode: `buildMaxHeap(arr)
for i = n - 1 to 1:
  swap(arr[0], arr[i])
  heapify(arr, 0, i)`
  },

  "fibonacci (recursion)": {
    explanation: "Use recursive formula: fib(n) = fib(n-1) + fib(n-2).\nBase cases: fib(0) = 0, fib(1) = 1.",
    pseudocode: `function fib(n):
  if n <= 1:
    return n
  return fib(n - 1) + fib(n - 2)`
  },

  "backtracking - subarrays": {
    explanation: "Generate all subarrays using backtracking.\nAdd to result on each step.",
    pseudocode: `function backtrack(start, path):
  res.append(path)
  for i = start to n - 1:
    backtrack(i + 1, path + [arr[i]])`
  },

  "climbing stairs": {
    explanation: "At each step, you can climb 1 or 2 stairs.\nUse DP to store ways to reach each step.",
    pseudocode: `dp[0] = 1
dp[1] = 1
for i = 2 to n:
  dp[i] = dp[i - 1] + dp[i - 2]
return dp[n]`
  },

  "change bit at position": {
    explanation: "Use bitwise OR to set and AND with NOT to clear bit at position `pos`.",
    pseudocode: `num = num | (1 << pos)   // set bit
num = num & ~(1 << pos)  // clear bit`
  },

  "lowest common ancestor": {
    explanation: "Recur down the tree.\nIf either node matches current, return it.\nIf both sides return non-null, current is LCA.",
    pseudocode: `function LCA(root, p, q):
  if root == null or root == p or root == q:
    return root
  left = LCA(root.left, p, q)
  right = LCA(root.right, p, q)
  if left and right:
    return root
  return left or right`
  },

  "sliding window - max sum": {
    explanation: "Slide a window of size k and keep track of max sum.",
    pseudocode: `sum = sum of first k elements
maxSum = sum
for i = k to n - 1:
  sum += arr[i] - arr[i - k]
  maxSum = max(maxSum, sum)
return maxSum`
  },

  "prefix sum": {
    explanation: "prefix[i] = arr[0] + arr[1] + ... + arr[i - 1]",
    pseudocode: `prefix[0] = 0
for i = 1 to n:
  prefix[i] = prefix[i - 1] + arr[i - 1]`
  },

  "difference array": {
    explanation: "To perform range updates, store differences and prefix sum later.",
    pseudocode: `diff = [0] * (n + 1)
diff[l] += val
diff[r + 1] -= val
// To get final array:
for i = 1 to n:
  arr[i] = arr[i - 1] + diff[i]`
  },

  "maximum subarray sum": {
    explanation: "Use Kadane’s algorithm to keep track of current and global max.",
    pseudocode: `maxSum = curr = arr[0]
for i = 1 to n - 1:
  curr = max(arr[i], curr + arr[i])
  maxSum = max(maxSum, curr)
return maxSum`
  },

  "2 sum problem": {
    explanation: "Use a hash map to store seen values and check for complement.",
    pseudocode: `map = {}
for i = 0 to n - 1:
  target = sum - arr[i]
  if target in map:
    return [map[target], i]
  map[arr[i]] = i`
  },

  "next greater element": {
    explanation: "Use a stack to keep track of indices.\nPop from stack until you find a greater element.",
    pseudocode: `stack = []
res = [-1] * n
for i = n - 1 to 0:
  while stack not empty and arr[stack[-1]] <= arr[i]:
    stack.pop()
  if stack:
    res[i] = arr[stack[-1]]
  stack.append(i)`
  },

  "height of binary tree": {
    explanation: "Use DFS to compute max depth from root.\nHeight = max(leftHeight, rightHeight) + 1.",
    pseudocode: `function height(node):
  if node == null:
    return 0
  left = height(node.left)
  right = height(node.right)
  return max(left, right) + 1`
  },
  "euclidean algorithm (gcd)": {
    explanation: "The Euclidean algorithm finds the greatest common divisor (GCD) of two numbers by repeatedly applying the rule: gcd(a, b) = gcd(b, a % b), until b becomes 0.",
    pseudocode: `
Function gcd(a, b):
  while b ≠ 0:
    temp = b
    b = a mod b
    a = temp
  return a
`
  },

  "sieve of eratosthenes": {
    explanation: "The sieve efficiently finds all prime numbers up to a given number n by iteratively marking the multiples of each prime starting from 2.",
    pseudocode: `
Function sieve(n):
  prime[] = [true, true, ..., true] (size n+1)
  for i = 2 to √n:
    if prime[i]:
      for j = i*i to n step i:
        prime[j] = false
  return all i where prime[i] == true
`
  },

  "modular exponentiantation": {
    explanation: "Modular exponentiation calculates (base^exp) % mod efficiently using divide-and-conquer (exponentiation by squaring).",
    pseudocode: `
Function modExp(base, exp, mod):
  result = 1
  while exp > 0:
    if exp % 2 == 1:
      result = (result * base) % mod
    base = (base * base) % mod
    exp = exp // 2
  return result
`
  },

  "fermart's theorem": {
    explanation: "Fermat’s Little Theorem states that if p is a prime number and a is not divisible by p, then a^(p-1) ≡ 1 (mod p). It helps find modular inverses.",
    pseudocode: `
Function modInverse(a, p):
  return modExp(a, p-2, p)  // Uses Fermat’s theorem
`
  },

  // ---------------- Array & Pointer ----------------

  "floyd’s cycle detection": {
    explanation: "Detects a cycle in a linked list using slow and fast pointers (tortoise and hare). If there's a cycle, they will eventually meet.",
    pseudocode: `
Function hasCycle(head):
  slow = head, fast = head
  while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow == fast:
      return true
  return false
`
  },

  "dutch national flag algorithm": {
    explanation: "Sorts an array of 0s, 1s, and 2s in a single pass using three pointers: low, mid, high.",
    pseudocode: `
Function sortColors(arr):
  low = 0, mid = 0, high = len(arr) - 1
  while mid <= high:
    if arr[mid] == 0:
      swap(arr[mid], arr[low])
      low++, mid++
    else if arr[mid] == 1:
      mid++
    else:
      swap(arr[mid], arr[high])
      high--
`
  },

  "kadane’s Algorithm": {
    explanation: "Finds the maximum sum of a contiguous subarray in linear time by maintaining current and global maximum sums.",
    pseudocode: `
Function maxSubarraySum(arr):
  maxSum = currSum = arr[0]
  for i = 1 to arr.length-1:
    currSum = max(arr[i], currSum + arr[i])
    maxSum = max(maxSum, currSum)
  return maxSum
`
  },

  "moore's algorithm": {
    explanation: "Finds the majority element (> n/2) in an array by canceling out different elements with a candidate and count.",
    pseudocode: `
Function majorityElement(arr):
  count = 0, candidate = None
  for num in arr:
    if count == 0:
      candidate = num
    count += (1 if num == candidate else -1)
  return candidate
`
  },

  // ---------------- Graph Algorithms ----------------

  "dijkstra's \nalgorithm": {
    explanation: "Dijkstra’s algorithm finds the shortest path from a source node to all other nodes in a weighted graph using a priority queue.",
    pseudocode: `
Function dijkstra(graph, src):
  dist[] = [∞, ∞, ..., ∞]
  dist[src] = 0
  pq = min-heap with (0, src)
  while pq not empty:
    (d, u) = pq.pop()
    for each (v, w) in neighbors[u]:
      if dist[v] > dist[u] + w:
        dist[v] = dist[u] + w
        pq.push((dist[v], v))
  return dist
`
  },

  "bellman ford algorithm": {
    explanation: "Finds shortest paths from a source to all vertices, even with negative weights. Runs in O(VE) time and detects negative cycles.",
    pseudocode: `
Function bellmanFord(graph, V, E, src):
  dist[] = [∞,...,∞]; dist[src] = 0
  for i = 1 to V-1:
    for each edge (u, v, w):
      if dist[u] + w < dist[v]:
        dist[v] = dist[u] + w
  // Check for negative cycle
  for each edge (u, v, w):
    if dist[u] + w < dist[v]:
      return "Negative cycle"
  return dist
`
  },

  "topological sort": {
    explanation: "Topological sort gives a linear ordering of vertices in a DAG such that for every directed edge u → v, u appears before v.",
    pseudocode: `
Function topologicalSort(graph):
  visited = set()
  stack = []
  for each node in graph:
    if not visited[node]:
      dfs(node)
  return reverse(stack)

Function dfs(node):
  visited[node] = true
  for neighbor in graph[node]:
    if not visited[neighbor]:
      dfs(neighbor)
  stack.push(node)
`
  },

  "floyd-warshall algorithm": {
    explanation: "Finds shortest paths between all pairs of vertices in O(V³) time using dynamic programming.",
    pseudocode: `
Function floydWarshall(matrix):
  for k = 0 to V-1:
    for i = 0 to V-1:
      for j = 0 to V-1:
        matrix[i][j] = min(matrix[i][j], matrix[i][k] + matrix[k][j])
  return matrix
`
  },

  "kruskal's algorithm": {
    explanation: "Finds the Minimum Spanning Tree (MST) by sorting all edges and greedily picking the smallest edge that doesn't form a cycle.",
    pseudocode: `
Function kruskal(edges, V):
  sort edges by weight
  parent = makeSet(V)
  mst = []
  for (u, v, w) in edges:
    if find(u) ≠ find(v):
      union(u, v)
      mst.append((u, v, w))
  return mst
`
  },

  "prim's algorithm": {
    explanation: "Builds MST by growing a tree from any node and always adding the smallest edge that connects to the remaining nodes.",
    pseudocode: `
Function prim(graph):
  visited = set()
  pq = min-heap with (0, start)
  totalCost = 0
  while pq not empty:
    (cost, node) = pq.pop()
    if node not in visited:
      totalCost += cost
      visited.add(node)
      for (neighbor, w) in graph[node]:
        if neighbor not in visited:
          pq.push((w, neighbor))
  return totalCost
`
  },

  "kosaraju’s (scc)": {
    explanation: "Finds Strongly Connected Components (SCCs) in a directed graph using two DFS passes: one on original, one on reversed graph.",
    pseudocode: `
Function kosaraju(graph):
  stack = []
  visited = set()
  for each node:
    if not visited:
      dfs1(node)
  reverse graph
  visited = set()
  while stack not empty:
    node = stack.pop()
    if not visited:
      dfs2(node)
      // Found one SCC

Function dfs1(node):
  mark visited
  for neighbor:
    if not visited:
      dfs1(neighbor)
  stack.push(node)

Function dfs2(node):
  mark visited
  for neighbor:
    if not visited:
      dfs2(neighbor)
`
  },

  "tarjan’s algorithm": {
    explanation: "Tarjan’s algorithm finds all SCCs in a directed graph in one DFS using low-link values and a stack.",
    pseudocode: `
Function tarjanSCC(graph):
  index = 0
  stack = []
  for each node:
    if node not visited:
      strongConnect(node)

Function strongConnect(node):
  index[node] = low[node] = index++
  stack.push(node)
  for neighbor in graph[node]:
    if neighbor not visited:
      strongConnect(neighbor)
      low[node] = min(low[node], low[neighbor])
    else if neighbor in stack:
      low[node] = min(low[node], index[neighbor])
  if low[node] == index[node]:
    // pop stack to form SCC
`
  },
};
