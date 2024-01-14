import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default async function Home() {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = await Promise.all(
    // 各ファイル情報を取得
    fileNames.map(async (fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      // slugとfrontmatterを取得
      return {
        slug: fileName.replace('.md', ''),
        frontmatter: data,
      };
    })
  ).then((posts) =>
    // 最新日付順に並び替え
    // posts.sort((a, b) => new Date(b.frontmatter.published_at) - new Date(a.frontmatter.published_at))
    posts
  );

  return (
    <div>
      <h1>My Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
