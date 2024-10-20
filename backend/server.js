import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/daily-problem', async (req, res) => {
  try {
    const response = await axios.get('https://alfa-leetcode-api.onrender.com/daily');
    //format json data
    const data = response.data;
    const formattedData = {
      questionLink: data.questionLink,
      date: data.date,
      questionId: data.questionId,
      questionFrontendId: data.questionFrontendId,
      questionTitle: data.questionTitle,
      titleSlug: data.titleSlug,
      difficulty: data.difficulty,
      isPaidOnly: data.isPaidOnly,
      question: data.question,
      exampleTestcases: data.exampleTestcases,
      topicTags: data.topicTags,
      hints: data.hints,
      solution: data.solution,
      likes: data.likes,
      dislikes: data.dislikes,
      similarQuestions: data.similarQuestions
    };
    res.json(response.data);
    console.log('formattedData:', formattedData);
  } catch (error) {
    console.error('Error fetching daily problem:', error);
    res.status(500).json({ error: 'Failed to fetch daily problem' });
  }
});

//data format:
//{"questionLink":"https://leetcode.com/problems/parsing-a-boolean-expression/","date":"2024-10-20","questionId":"1197","questionFrontendId":"1106","questionTitle":"Parsing A Boolean Expression","titleSlug":"parsing-a-boolean-expression","difficulty":"Hard","isPaidOnly":false,"question":"<p>A <strong>boolean expression</strong> is an expression that evaluates to either <code>true</code> or <code>false</code>. It can be in one of the following shapes:</p>\n\n<ul>\n\t<li><code>&#39;t&#39;</code> that evaluates to <code>true</code>.</li>\n\t<li><code>&#39;f&#39;</code> that evaluates to <code>false</code>.</li>\n\t<li><code>&#39;!(subExpr)&#39;</code> that evaluates to <strong>the logical NOT</strong> of the inner expression <code>subExpr</code>.</li>\n\t<li><code>&#39;&amp;(subExpr<sub>1</sub>, subExpr<sub>2</sub>, ..., subExpr<sub>n</sub>)&#39;</code> that evaluates to <strong>the logical AND</strong> of the inner expressions <code>subExpr<sub>1</sub>, subExpr<sub>2</sub>, ..., subExpr<sub>n</sub></code> where <code>n &gt;= 1</code>.</li>\n\t<li><code>&#39;|(subExpr<sub>1</sub>, subExpr<sub>2</sub>, ..., subExpr<sub>n</sub>)&#39;</code> that evaluates to <strong>the logical OR</strong> of the inner expressions <code>subExpr<sub>1</sub>, subExpr<sub>2</sub>, ..., subExpr<sub>n</sub></code> where <code>n &gt;= 1</code>.</li>\n</ul>\n\n<p>Given a string <code>expression</code> that represents a <strong>boolean expression</strong>, return <em>the evaluation of that expression</em>.</p>\n\n<p>It is <strong>guaranteed</strong> that the given expression is valid and follows the given rules.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> expression = &quot;&amp;(|(f))&quot;\n<strong>Output:</strong> false\n<strong>Explanation:</strong> \nFirst, evaluate |(f) --&gt; f. The expression is now &quot;&amp;(f)&quot;.\nThen, evaluate &amp;(f) --&gt; f. The expression is now &quot;f&quot;.\nFinally, return false.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> expression = &quot;|(f,f,f,t)&quot;\n<strong>Output:</strong> true\n<strong>Explanation:</strong> The evaluation of (false OR false OR false OR true) is true.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> expression = &quot;!(&amp;(f,t))&quot;\n<strong>Output:</strong> true\n<strong>Explanation:</strong> \nFirst, evaluate &amp;(f,t) --&gt; (false AND true) --&gt; false --&gt; f. The expression is now &quot;!(f)&quot;.\nThen, evaluate !(f) --&gt; NOT false --&gt; true. We return true.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= expression.length &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li>expression[i] is one following characters: <code>&#39;(&#39;</code>, <code>&#39;)&#39;</code>, <code>&#39;&amp;&#39;</code>, <code>&#39;|&#39;</code>, <code>&#39;!&#39;</code>, <code>&#39;t&#39;</code>, <code>&#39;f&#39;</code>, and <code>&#39;,&#39;</code>.</li>\n</ul>\n","exampleTestcases":"\"&(|(f))\"\n\"|(f,f,f,t)\"\n\"!(&(f,t))\"","topicTags":[{"name":"String","slug":"string","translatedName":null},{"name":"Stack","slug":"stack","translatedName":null},{"name":"Recursion","slug":"recursion","translatedName":null}],"hints":["Write a function \"parse\" which calls helper functions \"parse_or\", \"parse_and\", \"parse_not\"."],"solution":{"id":"2531","canSeeDetail":true,"paidOnly":false,"hasVideoSolution":false,"paidOnlyVideo":true},"companyTagStats":null,"likes":1285,"dislikes":68,"similarQuestions":"[]"}


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});