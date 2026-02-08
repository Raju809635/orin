import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { blogPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function BlogPostPage({ params }: { params: { postId: string } }) {
  const post = blogPosts.find(p => p.id.toString() === params.postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <article className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="p-0">
                <div className="mb-8">
                    <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                    <h1 className="text-3xl md:text-5xl font-bold font-headline leading-tight">{post.title}</h1>
                </div>
                <Image src={post.imageUrl} alt={post.title} width={1200} height={800} className="rounded-lg object-cover h-96 w-full" data-ai-hint={post.imageHint} />
            </CardHeader>
            <CardContent className="p-6">
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-6">
                    <p>{post.excerpt}</p>
                    <p>{post.content}</p>
                </div>
            </CardContent>
          </Card>
        </article>
      </main>
      <Footer />
    </div>
  );
}
