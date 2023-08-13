export default function Page() {
    return (
        <main className="grid h-screen grid-cols-4 gap-12 bg-background p-8 pt-32">
            <div className="h-35 w-35 grid items-center text-center text-2xl font-semibold">
                default
            </div>
            <div className="h-35 w-35 grid items-center bg-background text-center text-2xl font-semibold text-foreground">
                Back/Fore
            </div>
            <div className="h-35 w-35 grid items-center bg-primary text-center text-2xl font-semibold text-primary-foreground">
                Primary
            </div>
            <div className="h-35 w-35 grid items-center bg-secondary text-center text-2xl font-semibold text-secondary-foreground">
                Secondary
            </div>
            <div className="h-35 w-35 grid items-center bg-destructive text-center text-2xl font-semibold text-destructive-foreground">
                Destructive
            </div>
            <div className="h-35 w-35 grid items-center bg-muted text-center text-2xl font-semibold text-muted-foreground">
                Muted
            </div>
            <div className="h-35 w-35 grid items-center bg-accent text-center text-2xl font-semibold text-accent-foreground">
                Accent
            </div>
            <div className="h-35 w-35 grid items-center bg-popover text-center text-2xl font-semibold text-popover-foreground">
                Popover
            </div>
            <div className="h-35 w-35 grid items-center bg-card text-center text-2xl font-semibold text-card-foreground">
                Card
            </div>
        </main>
    )
}
