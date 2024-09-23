export default function Main({ children } : { children? : React.ReactNode}): JSX.Element {
    return (
        <main className="pt-24 pb-16 container mx-auto p-4">
            {children}
        </main>
    );
}
