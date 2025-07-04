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
  }
};
