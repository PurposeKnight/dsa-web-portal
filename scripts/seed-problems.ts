// ──────────────────────────────────────────────
// AlgoForge — Problem Seed Data (Blind 75 + extras)
// Run with: npx tsx scripts/seed-problems.ts
// Requires SUPABASE_SERVICE_ROLE_KEY in .env.local
// ──────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface SeedProblem {
  slug: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  topics: string[]
  companies: string[]
  description: string
  constraints: string
  test_cases: { input: string; expected_output: string; is_sample: boolean }[]
  hints: string[]
}

// we'll gradually add full descriptions+test cases for each
// for now this seeds the metadata so the problem list is usable
const problems: SeedProblem[] = [
  // ── Arrays & Hashing ───────────────────────────
  {
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    topics: ['Arrays', 'Hash Table'],
    companies: ['Google', 'Amazon', 'Meta', 'Apple'],
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    constraints: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.',
    test_cases: [
      { input: 'nums = [2,7,11,15], target = 9', expected_output: '[0,1]', is_sample: true },
      { input: 'nums = [3,2,4], target = 6', expected_output: '[1,2]', is_sample: true },
      { input: 'nums = [3,3], target = 6', expected_output: '[0,1]', is_sample: false },
    ],
    hints: [
      'Think about what value you need to find for each element.',
      'A hash map can store values you\'ve already seen.',
      'For each number, check if target - number exists in your map.',
    ],
  },
  {
    slug: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    topics: ['Arrays', 'Hash Table', 'Sorting'],
    companies: ['Amazon', 'Apple', 'Adobe'],
    description: 'Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.',
    constraints: '1 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9',
    test_cases: [
      { input: 'nums = [1,2,3,1]', expected_output: 'true', is_sample: true },
      { input: 'nums = [1,2,3,4]', expected_output: 'false', is_sample: true },
      { input: 'nums = [1,1,1,3,3,4,3,2,4,2]', expected_output: 'true', is_sample: false },
    ],
    hints: [
      'What data structure allows O(1) lookup?',
      'A Set can track numbers you\'ve already encountered.',
      'If the set size differs from array length, there are duplicates.',
    ],
  },
  {
    slug: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    topics: ['Hash Table', 'String', 'Sorting'],
    companies: ['Amazon', 'Goldman Sachs', 'Microsoft'],
    description: 'Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nAn anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    constraints: '1 <= s.length, t.length <= 5 * 10^4\ns and t consist of lowercase English letters.',
    test_cases: [
      { input: 's = "anagram", t = "nagaram"', expected_output: 'true', is_sample: true },
      { input: 's = "rat", t = "car"', expected_output: 'false', is_sample: true },
    ],
    hints: [
      'What if you count the frequency of each character?',
      'Compare the character frequency maps of both strings.',
      'Alternatively, sort both strings and compare.',
    ],
  },
  {
    slug: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    topics: ['Arrays', 'Hash Table', 'String', 'Sorting'],
    companies: ['Amazon', 'Meta', 'Bloomberg'],
    description: 'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.',
    constraints: '1 <= strs.length <= 10^4\n0 <= strs[i].length <= 100\nstrs[i] consists of lowercase English letters.',
    test_cases: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', expected_output: '[["bat"],["nat","tan"],["ate","eat","tea"]]', is_sample: true },
      { input: 'strs = [""]', expected_output: '[[""]]', is_sample: true },
      { input: 'strs = ["a"]', expected_output: '[["a"]]', is_sample: false },
    ],
    hints: [
      'Two strings are anagrams if they have the same sorted form.',
      'Use a hashmap with the sorted string as the key.',
      'Group all strings that share the same sorted key.',
    ],
  },
  {
    slug: 'top-k-frequent-elements',
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    topics: ['Arrays', 'Hash Table', 'Heap', 'Bucket Sort'],
    companies: ['Amazon', 'Meta', 'Apple', 'Google'],
    description: 'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.',
    constraints: '1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4\nk is in the range [1, the number of unique elements].\nThe answer is guaranteed to be unique.',
    test_cases: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', expected_output: '[1,2]', is_sample: true },
      { input: 'nums = [1], k = 1', expected_output: '[1]', is_sample: true },
    ],
    hints: [
      'Count the frequency of each element first.',
      'You can use a min-heap of size k.',
      'Bucket sort approach: index = frequency, value = list of elements with that frequency.',
    ],
  },
  {
    slug: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    topics: ['Arrays', 'Prefix Sum'],
    companies: ['Amazon', 'Meta', 'Apple', 'Microsoft'],
    description: 'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nThe product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.\n\nYou must write an algorithm that runs in O(n) time and without using the division operation.',
    constraints: '2 <= nums.length <= 10^5\n-30 <= nums[i] <= 30\nThe product of any prefix or suffix fits in a 32-bit integer.',
    test_cases: [
      { input: 'nums = [1,2,3,4]', expected_output: '[24,12,8,6]', is_sample: true },
      { input: 'nums = [-1,1,0,-3,3]', expected_output: '[0,0,9,0,0]', is_sample: true },
    ],
    hints: [
      'Think about prefix products and suffix products.',
      'For each index, the answer is prefix_product * suffix_product.',
      'You can compute this in two passes using O(1) extra space.',
    ],
  },

  // ── Two Pointers ──────────────────────────────
  {
    slug: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    topics: ['Two Pointers', 'String'],
    companies: ['Meta', 'Microsoft', 'Amazon'],
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.',
    constraints: '1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.',
    test_cases: [
      { input: 's = "A man, a plan, a canal: Panama"', expected_output: 'true', is_sample: true },
      { input: 's = "race a car"', expected_output: 'false', is_sample: true },
    ],
    hints: [
      'Use two pointers, one at the start and one at the end.',
      'Skip non-alphanumeric characters.',
      'Compare characters after converting to lowercase.',
    ],
  },
  {
    slug: 'three-sum',
    title: '3Sum',
    difficulty: 'Medium',
    topics: ['Arrays', 'Two Pointers', 'Sorting'],
    companies: ['Meta', 'Amazon', 'Google', 'Apple', 'Bloomberg'],
    description: 'Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.',
    constraints: '3 <= nums.length <= 3000\n-10^5 <= nums[i] <= 10^5',
    test_cases: [
      { input: 'nums = [-1,0,1,2,-1,-4]', expected_output: '[[-1,-1,2],[-1,0,1]]', is_sample: true },
      { input: 'nums = [0,1,1]', expected_output: '[]', is_sample: true },
      { input: 'nums = [0,0,0]', expected_output: '[[0,0,0]]', is_sample: false },
    ],
    hints: [
      'Sort the array first, then fix one element and use two pointers for the rest.',
      'Skip duplicate values to avoid duplicate triplets.',
      'The two-pointer technique works because the array is sorted.',
    ],
  },
  {
    slug: 'container-with-most-water',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    topics: ['Arrays', 'Two Pointers', 'Greedy'],
    companies: ['Amazon', 'Google', 'Goldman Sachs', 'Meta'],
    description: 'You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the ith line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.',
    constraints: 'n == height.length\n2 <= n <= 10^5\n0 <= height[i] <= 10^4',
    test_cases: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', expected_output: '49', is_sample: true },
      { input: 'height = [1,1]', expected_output: '1', is_sample: true },
    ],
    hints: [
      'Start with the widest container (leftmost and rightmost lines).',
      'Move the pointer pointing to the shorter line inward.',
      'The area is limited by the shorter line, so moving the taller one can\'t help.',
    ],
  },

  // ── Sliding Window ────────────────────────────
  {
    slug: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    topics: ['Arrays', 'Sliding Window', 'Dynamic Programming'],
    companies: ['Amazon', 'Meta', 'Google', 'Apple', 'Microsoft'],
    description: 'You are given an array `prices` where `prices[i]` is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
    constraints: '1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^4',
    test_cases: [
      { input: 'prices = [7,1,5,3,6,4]', expected_output: '5', is_sample: true },
      { input: 'prices = [7,6,4,3,1]', expected_output: '0', is_sample: true },
    ],
    hints: [
      'Track the minimum price seen so far.',
      'At each day, calculate the profit if you sold today.',
      'Keep updating the max profit as you go.',
    ],
  },
  {
    slug: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topics: ['Hash Table', 'String', 'Sliding Window'],
    companies: ['Amazon', 'Meta', 'Google', 'Bloomberg', 'Microsoft'],
    description: 'Given a string `s`, find the length of the longest substring without repeating characters.',
    constraints: '0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.',
    test_cases: [
      { input: 's = "abcabcbb"', expected_output: '3', is_sample: true },
      { input: 's = "bbbbb"', expected_output: '1', is_sample: true },
      { input: 's = "pwwkew"', expected_output: '3', is_sample: false },
    ],
    hints: [
      'Use a sliding window with two pointers.',
      'Expand the window to the right, shrink from the left when you see a repeat.',
      'A Set or HashMap can track characters in the current window.',
    ],
  },
  {
    slug: 'minimum-window-substring',
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    topics: ['Hash Table', 'String', 'Sliding Window'],
    companies: ['Meta', 'Amazon', 'Google', 'Airbnb', 'Uber'],
    description: 'Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string "".',
    constraints: 'm == s.length\nn == t.length\n1 <= m, n <= 10^5\ns and t consist of uppercase and lowercase English letters.',
    test_cases: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', expected_output: '"BANC"', is_sample: true },
      { input: 's = "a", t = "a"', expected_output: '"a"', is_sample: true },
      { input: 's = "a", t = "aa"', expected_output: '""', is_sample: false },
    ],
    hints: [
      'Use two pointers to form a sliding window.',
      'Expand right until all chars of t are covered, then shrink left.',
      'Track character counts with a frequency map and a "formed" counter.',
    ],
  },

  // ── Stack ─────────────────────────────────────
  {
    slug: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topics: ['String', 'Stack'],
    companies: ['Amazon', 'Meta', 'Google', 'Bloomberg'],
    description: 'Given a string `s` containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
    constraints: '1 <= s.length <= 10^4\ns consists of parentheses only.',
    test_cases: [
      { input: 's = "()"', expected_output: 'true', is_sample: true },
      { input: 's = "()[]{}"', expected_output: 'true', is_sample: true },
      { input: 's = "(]"', expected_output: 'false', is_sample: false },
    ],
    hints: [
      'Use a stack — push opening brackets, pop on closing ones.',
      'When you see a closing bracket, check if the top of the stack matches.',
      'At the end, the stack should be empty if the string is valid.',
    ],
  },

  // ── Binary Search ─────────────────────────────
  {
    slug: 'binary-search',
    title: 'Binary Search',
    difficulty: 'Easy',
    topics: ['Arrays', 'Binary Search'],
    companies: ['Microsoft', 'Amazon', 'Apple'],
    description: 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return -1.\n\nYou must write an algorithm with O(log n) runtime complexity.',
    constraints: '1 <= nums.length <= 10^4\n-10^4 < nums[i], target < 10^4\nAll the integers in nums are unique.\nnums is sorted in ascending order.',
    test_cases: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', expected_output: '4', is_sample: true },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', expected_output: '-1', is_sample: true },
    ],
    hints: [
      'Compare the target with the middle element.',
      'If target is smaller, search the left half. If larger, search the right.',
      'Repeat until the search space is empty.',
    ],
  },
  {
    slug: 'search-in-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    topics: ['Arrays', 'Binary Search'],
    companies: ['Meta', 'Amazon', 'Microsoft', 'Bloomberg'],
    description: 'There is an integer array `nums` sorted in ascending order (with distinct values).\n\nPrior to being passed to your function, `nums` is possibly rotated at an unknown pivot index `k`. Given the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or -1 if it is not.',
    constraints: '1 <= nums.length <= 5000\n-10^4 <= nums[i] <= 10^4\nAll values of nums are unique.\nnums is an ascending array that is possibly rotated.',
    test_cases: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', expected_output: '4', is_sample: true },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', expected_output: '-1', is_sample: true },
      { input: 'nums = [1], target = 0', expected_output: '-1', is_sample: false },
    ],
    hints: [
      'One half of the array is always sorted.',
      'Determine which half is sorted and check if target lies in that half.',
      'Narrow the search accordingly.',
    ],
  },

  // ── Linked List ───────────────────────────────
  {
    slug: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    topics: ['Linked List', 'Recursion'],
    companies: ['Amazon', 'Apple', 'Microsoft', 'Bloomberg'],
    description: 'Given the `head` of a singly linked list, reverse the list, and return the reversed list.',
    constraints: 'The number of nodes in the list is in the range [0, 5000].\n-5000 <= Node.val <= 5000',
    test_cases: [
      { input: 'head = [1,2,3,4,5]', expected_output: '[5,4,3,2,1]', is_sample: true },
      { input: 'head = [1,2]', expected_output: '[2,1]', is_sample: true },
      { input: 'head = []', expected_output: '[]', is_sample: false },
    ],
    hints: [
      'Use three pointers: prev, current, and next.',
      'At each step, reverse the current node\'s next pointer.',
      'Move all three pointers forward one step.',
    ],
  },
  {
    slug: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    topics: ['Linked List', 'Recursion'],
    companies: ['Amazon', 'Apple', 'Microsoft', 'Meta'],
    description: 'You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.',
    constraints: 'The number of nodes in both lists is in [0, 50].\n-100 <= Node.val <= 100\nBoth list1 and list2 are sorted in non-decreasing order.',
    test_cases: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', expected_output: '[1,1,2,3,4,4]', is_sample: true },
      { input: 'list1 = [], list2 = []', expected_output: '[]', is_sample: true },
      { input: 'list1 = [], list2 = [0]', expected_output: '[0]', is_sample: false },
    ],
    hints: [
      'Use a dummy head node to simplify the merge.',
      'Compare the current nodes of both lists and pick the smaller one.',
      'When one list runs out, attach the remainder of the other.',
    ],
  },
  {
    slug: 'linked-list-cycle',
    title: 'Linked List Cycle',
    difficulty: 'Easy',
    topics: ['Linked List', 'Two Pointers'],
    companies: ['Amazon', 'Microsoft', 'Goldman Sachs'],
    description: 'Given `head`, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.',
    constraints: 'The number of the nodes in the list is in [0, 10^4].\n-10^5 <= Node.val <= 10^5',
    test_cases: [
      { input: 'head = [3,2,0,-4], pos = 1', expected_output: 'true', is_sample: true },
      { input: 'head = [1,2], pos = 0', expected_output: 'true', is_sample: true },
      { input: 'head = [1], pos = -1', expected_output: 'false', is_sample: false },
    ],
    hints: [
      'Use Floyd\'s cycle detection (tortoise and hare).',
      'Move slow pointer one step, fast pointer two steps.',
      'If they meet, there\'s a cycle.',
    ],
  },

  // ── Trees ─────────────────────────────────────
  {
    slug: 'invert-binary-tree',
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    topics: ['Tree', 'BFS', 'DFS', 'Recursion'],
    companies: ['Google', 'Amazon', 'Meta'],
    description: 'Given the `root` of a binary tree, invert the tree, and return its root.',
    constraints: 'The number of nodes in the tree is in [0, 100].\n-100 <= Node.val <= 100',
    test_cases: [
      { input: 'root = [4,2,7,1,3,6,9]', expected_output: '[4,7,2,9,6,3,1]', is_sample: true },
      { input: 'root = [2,1,3]', expected_output: '[2,3,1]', is_sample: true },
    ],
    hints: [
      'Swap the left and right children of every node.',
      'You can do this recursively — swap, then recurse on both children.',
      'Base case: if node is null, return null.',
    ],
  },
  {
    slug: 'maximum-depth-of-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    topics: ['Tree', 'BFS', 'DFS', 'Recursion'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    description: 'Given the `root` of a binary tree, return its maximum depth.\n\nA binary tree\'s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
    constraints: 'The number of nodes in the tree is in [0, 10^4].\n-100 <= Node.val <= 100',
    test_cases: [
      { input: 'root = [3,9,20,null,null,15,7]', expected_output: '3', is_sample: true },
      { input: 'root = [1,null,2]', expected_output: '2', is_sample: true },
    ],
    hints: [
      'Think recursively: max depth = 1 + max(left depth, right depth).',
      'Base case: an empty tree has depth 0.',
      'You can also solve iteratively with BFS — count the number of levels.',
    ],
  },
  {
    slug: 'validate-binary-search-tree',
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    topics: ['Tree', 'DFS', 'BST', 'Recursion'],
    companies: ['Amazon', 'Meta', 'Bloomberg', 'Microsoft'],
    description: 'Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).\n\nA valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys less than the node\'s key.\n- The right subtree of a node contains only nodes with keys greater than the node\'s key.\n- Both the left and right subtrees must also be binary search trees.',
    constraints: 'The number of nodes in the tree is in [1, 10^4].\n-2^31 <= Node.val <= 2^31 - 1',
    test_cases: [
      { input: 'root = [2,1,3]', expected_output: 'true', is_sample: true },
      { input: 'root = [5,1,4,null,null,3,6]', expected_output: 'false', is_sample: true },
    ],
    hints: [
      'Each node must fall within a valid range (min, max).',
      'Recursively narrow the range as you go left and right.',
      'An in-order traversal of a valid BST produces a sorted sequence.',
    ],
  },
  {
    slug: 'lowest-common-ancestor-of-bst',
    title: 'Lowest Common Ancestor of a Binary Search Tree',
    difficulty: 'Medium',
    topics: ['Tree', 'DFS', 'BST'],
    companies: ['Meta', 'Amazon', 'Microsoft'],
    description: 'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.\n\nThe lowest common ancestor is defined between two nodes p and q as the lowest node in the tree that has both p and q as descendants.',
    constraints: 'The number of nodes is in [2, 10^5].\n-10^9 <= Node.val <= 10^9\nAll Node.val are unique.\np != q\np and q will exist in the BST.',
    test_cases: [
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', expected_output: '6', is_sample: true },
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4', expected_output: '2', is_sample: true },
    ],
    hints: [
      'Use the BST property: left subtree < root < right subtree.',
      'If both p and q are smaller than root, LCA is in the left subtree.',
      'If both are larger, LCA is in the right. Otherwise, root is the LCA.',
    ],
  },

  // ── Dynamic Programming ───────────────────────
  {
    slug: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    topics: ['Dynamic Programming', 'Math'],
    companies: ['Amazon', 'Apple', 'Google', 'Adobe'],
    description: 'You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    constraints: '1 <= n <= 45',
    test_cases: [
      { input: 'n = 2', expected_output: '2', is_sample: true },
      { input: 'n = 3', expected_output: '3', is_sample: true },
    ],
    hints: [
      'This is essentially the Fibonacci sequence.',
      'dp[i] = dp[i-1] + dp[i-2].',
      'Base cases: dp[1] = 1, dp[2] = 2.',
    ],
  },
  {
    slug: 'coin-change',
    title: 'Coin Change',
    difficulty: 'Medium',
    topics: ['Arrays', 'Dynamic Programming', 'BFS'],
    companies: ['Amazon', 'Apple', 'Bloomberg', 'Google'],
    description: 'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.',
    constraints: '1 <= coins.length <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4',
    test_cases: [
      { input: 'coins = [1,5,10], amount = 12', expected_output: '3', is_sample: true },
      { input: 'coins = [2], amount = 3', expected_output: '-1', is_sample: true },
      { input: 'coins = [1], amount = 0', expected_output: '0', is_sample: false },
    ],
    hints: [
      'Build up solutions from smaller amounts: dp[i] = min coins for amount i.',
      'For each amount, try every coin and take the minimum.',
      'dp[amount] = min(dp[amount - coin] + 1) for each valid coin.',
    ],
  },
  {
    slug: 'longest-increasing-subsequence',
    title: 'Longest Increasing Subsequence',
    difficulty: 'Medium',
    topics: ['Arrays', 'Dynamic Programming', 'Binary Search'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    description: 'Given an integer array `nums`, return the length of the longest strictly increasing subsequence.',
    constraints: '1 <= nums.length <= 2500\n-10^4 <= nums[i] <= 10^4',
    test_cases: [
      { input: 'nums = [10,9,2,5,3,7,101,18]', expected_output: '4', is_sample: true },
      { input: 'nums = [0,1,0,3,2,3]', expected_output: '4', is_sample: true },
      { input: 'nums = [7,7,7,7,7,7,7]', expected_output: '1', is_sample: false },
    ],
    hints: [
      'dp[i] = length of longest increasing subsequence ending at index i.',
      'For each i, check all j < i where nums[j] < nums[i].',
      'O(n log n) solution uses binary search with a tails array.',
    ],
  },
  {
    slug: 'word-break',
    title: 'Word Break',
    difficulty: 'Medium',
    topics: ['String', 'Dynamic Programming', 'Trie', 'Hash Table'],
    companies: ['Amazon', 'Meta', 'Google', 'Apple', 'Bloomberg'],
    description: 'Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.',
    constraints: '1 <= s.length <= 300\n1 <= wordDict.length <= 1000\n1 <= wordDict[i].length <= 20\ns and wordDict[i] consist of only lowercase English letters.',
    test_cases: [
      { input: 's = "leetcode", wordDict = ["leet","code"]', expected_output: 'true', is_sample: true },
      { input: 's = "applepenapple", wordDict = ["apple","pen"]', expected_output: 'true', is_sample: true },
      { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', expected_output: 'false', is_sample: false },
    ],
    hints: [
      'dp[i] = true if s[0..i] can be segmented.',
      'For each position i, check all words that end at i.',
      'dp[i] = true if any dp[i - word.length] is true and s[i-len..i] is in dict.',
    ],
  },
  {
    slug: 'house-robber',
    title: 'House Robber',
    difficulty: 'Medium',
    topics: ['Arrays', 'Dynamic Programming'],
    companies: ['Amazon', 'Adobe', 'Cisco', 'Google'],
    description: 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.\n\nGiven an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.',
    constraints: '1 <= nums.length <= 100\n0 <= nums[i] <= 400',
    test_cases: [
      { input: 'nums = [1,2,3,1]', expected_output: '4', is_sample: true },
      { input: 'nums = [2,7,9,3,1]', expected_output: '12', is_sample: true },
    ],
    hints: [
      'At each house, you either rob it or skip it.',
      'dp[i] = max(dp[i-1], dp[i-2] + nums[i]).',
      'You only need the last two values, not the full array.',
    ],
  },

  // ── Graphs ────────────────────────────────────
  {
    slug: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'Medium',
    topics: ['Arrays', 'DFS', 'BFS', 'Graph', 'Union Find'],
    companies: ['Amazon', 'Meta', 'Google', 'Bloomberg', 'Microsoft'],
    description: 'Given an m x n 2D binary grid `grid` which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
    constraints: 'm == grid.length\nn == grid[i].length\n1 <= m, n <= 300\ngrid[i][j] is \'0\' or \'1\'.',
    test_cases: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expected_output: '1', is_sample: true },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expected_output: '3', is_sample: true },
    ],
    hints: [
      'Iterate through the grid. When you find a \'1\', that\'s a new island.',
      'Use DFS/BFS to mark all connected land cells as visited.',
      'Count how many times you start a new DFS/BFS.',
    ],
  },
  {
    slug: 'clone-graph',
    title: 'Clone Graph',
    difficulty: 'Medium',
    topics: ['Graph', 'BFS', 'DFS', 'Hash Table'],
    companies: ['Meta', 'Amazon', 'Google', 'Bloomberg'],
    description: 'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.',
    constraints: 'The number of nodes in the graph is in [0, 100].\n1 <= Node.val <= 100\nNode.val is unique for each node.',
    test_cases: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', expected_output: '[[2,4],[1,3],[2,4],[1,3]]', is_sample: true },
      { input: 'adjList = [[]]', expected_output: '[[]]', is_sample: true },
    ],
    hints: [
      'Use a hashmap to map original nodes to their clones.',
      'BFS or DFS from the starting node, cloning as you go.',
      'For each neighbor, either reuse the existing clone or create one.',
    ],
  },
  {
    slug: 'course-schedule',
    title: 'Course Schedule',
    difficulty: 'Medium',
    topics: ['Graph', 'DFS', 'BFS', 'Topological Sort'],
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Apple'],
    description: 'There are a total of `numCourses` courses you have to take, labeled from 0 to numCourses - 1. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course bi first if you want to take course ai.\n\nReturn true if you can finish all courses. Otherwise, return false.',
    constraints: '1 <= numCourses <= 2000\n0 <= prerequisites.length <= 5000\nprequisites[i].length == 2\n0 <= ai, bi < numCourses\nAll prerequisite pairs are unique.',
    test_cases: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', expected_output: 'true', is_sample: true },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', expected_output: 'false', is_sample: true },
    ],
    hints: [
      'This is a cycle detection problem in a directed graph.',
      'Build an adjacency list from prerequisites.',
      'Use topological sort (BFS with Kahn\'s algorithm) or DFS with visited states.',
    ],
  },

  // ── Intervals ─────────────────────────────────
  {
    slug: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    topics: ['Arrays', 'Sorting'],
    companies: ['Meta', 'Amazon', 'Google', 'Bloomberg', 'Apple'],
    description: 'Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
    constraints: '1 <= intervals.length <= 10^4\nintervals[i].length == 2\n0 <= start_i <= end_i <= 10^4',
    test_cases: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', expected_output: '[[1,6],[8,10],[15,18]]', is_sample: true },
      { input: 'intervals = [[1,4],[4,5]]', expected_output: '[[1,5]]', is_sample: true },
    ],
    hints: [
      'Sort intervals by start time first.',
      'Iterate and merge if current interval overlaps with the last merged one.',
      'Two intervals overlap if current.start <= last.end.',
    ],
  },
  {
    slug: 'non-overlapping-intervals',
    title: 'Non-overlapping Intervals',
    difficulty: 'Medium',
    topics: ['Arrays', 'Dynamic Programming', 'Greedy', 'Sorting'],
    companies: ['Amazon', 'Meta', 'Google'],
    description: 'Given an array of intervals `intervals` where `intervals[i] = [start_i, end_i]`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.',
    constraints: '1 <= intervals.length <= 10^5\nintervals[i].length == 2\n-5 * 10^4 <= start_i < end_i <= 5 * 10^4',
    test_cases: [
      { input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', expected_output: '1', is_sample: true },
      { input: 'intervals = [[1,2],[1,2],[1,2]]', expected_output: '2', is_sample: true },
      { input: 'intervals = [[1,2],[2,3]]', expected_output: '0', is_sample: false },
    ],
    hints: [
      'Sort by end time and greedily pick non-overlapping intervals.',
      'When overlap occurs, keep the interval that ends sooner.',
      'Count = total intervals - max non-overlapping intervals.',
    ],
  },

  // ── Bit Manipulation ──────────────────────────
  {
    slug: 'number-of-1-bits',
    title: 'Number of 1 Bits',
    difficulty: 'Easy',
    topics: ['Bit Manipulation'],
    companies: ['Apple', 'Microsoft', 'Amazon'],
    description: 'Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).',
    constraints: '1 <= n <= 2^31 - 1',
    test_cases: [
      { input: 'n = 11', expected_output: '3', is_sample: true },
      { input: 'n = 128', expected_output: '1', is_sample: true },
      { input: 'n = 2147483645', expected_output: '30', is_sample: false },
    ],
    hints: [
      'Check each bit by ANDing with 1 and shifting right.',
      'n & (n - 1) flips the lowest set bit — count how many times until n = 0.',
      'This is called Brian Kernighan\'s algorithm.',
    ],
  },
  {
    slug: 'counting-bits',
    title: 'Counting Bits',
    difficulty: 'Easy',
    topics: ['Dynamic Programming', 'Bit Manipulation'],
    companies: ['Amazon', 'Apple'],
    description: 'Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (0 <= i <= n), `ans[i]` is the number of 1\'s in the binary representation of `i`.',
    constraints: '0 <= n <= 10^5',
    test_cases: [
      { input: 'n = 2', expected_output: '[0,1,1]', is_sample: true },
      { input: 'n = 5', expected_output: '[0,1,1,2,1,2]', is_sample: true },
    ],
    hints: [
      'dp[i] = dp[i >> 1] + (i & 1).',
      'Right shifting i by 1 gives a number you\'ve already computed.',
      'The last bit (i & 1) tells you if this adds one more set bit.',
    ],
  },
  {
    slug: 'reverse-bits',
    title: 'Reverse Bits',
    difficulty: 'Easy',
    topics: ['Bit Manipulation'],
    companies: ['Apple', 'Amazon'],
    description: 'Reverse bits of a given 32 bits unsigned integer.',
    constraints: 'The input must be a binary string of length 32.',
    test_cases: [
      { input: 'n = 00000010100101000001111010011100', expected_output: '964176192', is_sample: true },
      { input: 'n = 11111111111111111111111111111101', expected_output: '3221225471', is_sample: true },
    ],
    hints: [
      'Process each bit from right to left.',
      'Shift the result left and add the lowest bit of n.',
      'Shift n right. Repeat 32 times.',
    ],
  },
  {
    slug: 'missing-number',
    title: 'Missing Number',
    difficulty: 'Easy',
    topics: ['Arrays', 'Hash Table', 'Math', 'Bit Manipulation', 'Sorting'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    description: 'Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.',
    constraints: 'n == nums.length\n1 <= n <= 10^4\n0 <= nums[i] <= n\nAll the numbers of nums are unique.',
    test_cases: [
      { input: 'nums = [3,0,1]', expected_output: '2', is_sample: true },
      { input: 'nums = [0,1]', expected_output: '2', is_sample: true },
      { input: 'nums = [9,6,4,2,3,5,7,0,1]', expected_output: '8', is_sample: false },
    ],
    hints: [
      'The expected sum is n*(n+1)/2. Subtract the actual sum.',
      'XOR approach: XOR all numbers with all indices.',
      'The missing number will be the result since x ^ x = 0.',
    ],
  },

  // ── Heap / Priority Queue ─────────────────────
  {
    slug: 'find-median-from-data-stream',
    title: 'Find Median from Data Stream',
    difficulty: 'Hard',
    topics: ['Heap', 'Design', 'Sorting'],
    companies: ['Amazon', 'Google', 'Meta', 'Apple', 'Microsoft'],
    description: 'The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.\n\nImplement the MedianFinder class:\n- MedianFinder() initializes the MedianFinder object.\n- void addNum(int num) adds the integer num from the data stream.\n- double findMedian() returns the median of all elements so far.',
    constraints: '-10^5 <= num <= 10^5\nThere will be at least one element before findMedian is called.\nAt most 5 * 10^4 calls to addNum and findMedian.',
    test_cases: [
      { input: '["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]\n[[], [1], [2], [], [3], []]', expected_output: '[null, null, null, 1.5, null, 2.0]', is_sample: true },
    ],
    hints: [
      'Use two heaps: a max-heap for the lower half, a min-heap for the upper half.',
      'Balance the heaps so they differ in size by at most 1.',
      'The median is the top of the larger heap, or the average of both tops.',
    ],
  },

  // ── Backtracking ──────────────────────────────
  {
    slug: 'combination-sum',
    title: 'Combination Sum',
    difficulty: 'Medium',
    topics: ['Arrays', 'Backtracking'],
    companies: ['Amazon', 'Meta', 'Bloomberg'],
    description: 'Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of candidates where the chosen numbers sum to `target`. You may return the combinations in any order.\n\nThe same number may be chosen from candidates an unlimited number of times.',
    constraints: '1 <= candidates.length <= 30\n2 <= candidates[i] <= 40\nAll elements of candidates are distinct.\n1 <= target <= 40',
    test_cases: [
      { input: 'candidates = [2,3,6,7], target = 7', expected_output: '[[2,2,3],[7]]', is_sample: true },
      { input: 'candidates = [2,3,5], target = 8', expected_output: '[[2,2,2,2],[2,3,3],[3,5]]', is_sample: true },
    ],
    hints: [
      'Use backtracking, starting from each candidate.',
      'Since you can reuse elements, don\'t increment the start index when you pick one.',
      'Prune when the remaining target becomes negative.',
    ],
  },
]

async function seed() {
  console.log(`Seeding ${problems.length} problems...`)

  // insert in batches of 10
  for (let i = 0; i < problems.length; i += 10) {
    const batch = problems.slice(i, i + 10)
    const { error } = await supabase
      .from('problems')
      .upsert(batch, { onConflict: 'slug' })

    if (error) {
      console.error(`Failed to insert batch starting at index ${i}:`, error)
      process.exit(1)
    }

    console.log(`  Inserted ${Math.min(i + 10, problems.length)}/${problems.length}`)
  }

  console.log('Done! All problems seeded.')
}

seed().catch(console.error)
