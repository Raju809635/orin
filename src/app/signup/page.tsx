import Link from 'next/link';

export default function SignUpPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <p>Please <Link href="/" className="text-primary underline">sign up here</Link>.</p>
        </div>
    );
}
