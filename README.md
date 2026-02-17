# Difference between null and undefined.
- Undefined: যখন একটি ভেরিয়েবল declare করা হয় কিন্তু কোনো value assign করা হয় না, তখন সেটির মান হয় undefined। এটি JavaScript নিজে থেকে assign করে।
- Null: null একটি intentional empty value। Developer নিজে ইচ্ছাকৃতভাবে সেট করে।
# What is the use of the map() function in JavaScript? How is it different from forEach()?
## map()
- Array এর প্রতিটি element এর উপর operation চালায়
- নতুন একটি array return করে
- Original array পরিবর্তন করে না
## forEach()
- প্রতিটি element এর উপর iterate করে
- কোনো কিছু return করে না
- সাধারণত side-effect এর জন্য ব্যবহার হয়
# What is the difference between == and ===?
## == 
- Value compare করে
- প্রয়োজনে type conversion কর
## ===
- Value এবং Type দুটোই compare করে
- কোনো type conversion করে না
#  What is the significance of async/await in fetching API data?
- API call asynchronous হয়। async/await ব্যবহার করলে asynchronous code synchronous এর মতো readable হয়।
# Explain the concept of Scope in JavaScript (Global, Function, Block).
## Global Scope
- Program এর যেকোনো জায়গা থেকে access করা যায়
## Function Scope
- Function এর ভিতরে declare করা variable বাইরে থেকে access করা যায় না
- var function scoped

## Block Scope
- {} block এর ভিতরে declare করা variable
- let এবং const block scoped
