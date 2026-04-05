export default function SetupPage() {
  const vars = [
    // Supabase (database only)
    { name: 'NEXT_PUBLIC_SUPABASE_URL', set: !!process.env.NEXT_PUBLIC_SUPABASE_URL },
    { name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', set: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY },
    { name: 'SUPABASE_SERVICE_ROLE_KEY', set: !!process.env.SUPABASE_SERVICE_ROLE_KEY },
    // Firebase Auth + Analytics
    { name: 'NEXT_PUBLIC_FIREBASE_API_KEY', set: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY },
    { name: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', set: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN },
    { name: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID', set: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID },
    { name: 'NEXT_PUBLIC_FIREBASE_APP_ID', set: !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID },
    { name: 'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID', set: !!process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID },
    { name: 'FIREBASE_ADMIN_PROJECT_ID', set: !!process.env.FIREBASE_ADMIN_PROJECT_ID },
    { name: 'FIREBASE_ADMIN_CLIENT_EMAIL', set: !!process.env.FIREBASE_ADMIN_CLIENT_EMAIL },
    { name: 'FIREBASE_ADMIN_PRIVATE_KEY', set: !!process.env.FIREBASE_ADMIN_PRIVATE_KEY },
    // Paddle
    { name: 'NEXT_PUBLIC_PADDLE_ENV', set: !!process.env.NEXT_PUBLIC_PADDLE_ENV },
    { name: 'PADDLE_API_KEY', set: !!process.env.PADDLE_API_KEY },
    { name: 'PADDLE_NOTIFICATION_WEBHOOK_SECRET', set: !!process.env.PADDLE_NOTIFICATION_WEBHOOK_SECRET },
    { name: 'NEXT_PUBLIC_PADDLE_CLIENT_TOKEN', set: !!process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN },
  ];

  const missing = vars.filter((v) => !v.set);
  const allSet = missing.length === 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight mb-3">Environment setup</h1>
          <p className="text-muted-foreground">
            Create <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">.env.local</code> in the project
            root, then fill in the values below. Restart the dev server when done.
          </p>
        </div>

        {/* Status bar */}
        <div
          className={`rounded-xl p-4 mb-10 border text-sm font-medium ${allSet ? 'border-green-500/30 bg-green-500/5 text-green-600' : 'border-border bg-muted/40 text-muted-foreground'}`}
        >
          {allSet
            ? '✓ All variables are set. Restart the dev server to load the app.'
            : `${missing.length} of ${vars.length} variables missing.`}
        </div>

        {/* Supabase section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-base font-semibold">Supabase (database)</h2>
            <a
              href="https://supabase.com/dashboard/project/_/settings/api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
            >
              Open dashboard →
            </a>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Used for the Postgres database only. Go to your Supabase project → <strong>Settings → API</strong>.
          </p>

          <div className="rounded-xl border border-border overflow-hidden">
            <EnvRow
              name="NEXT_PUBLIC_SUPABASE_URL"
              hint='Under "Project URL" — looks like https://xxxx.supabase.co'
              set={!!process.env.NEXT_PUBLIC_SUPABASE_URL}
            />
            <EnvRow
              name="NEXT_PUBLIC_SUPABASE_ANON_KEY"
              hint='Under "Project API keys" → anon / public key'
              set={!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}
            />
            <EnvRow
              name="SUPABASE_SERVICE_ROLE_KEY"
              hint='Under "Project API keys" → service_role key. Keep this secret — never expose it client-side.'
              set={!!process.env.SUPABASE_SERVICE_ROLE_KEY}
              last
            />
          </div>
        </section>

        {/* Firebase section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-base font-semibold">Firebase (auth + analytics)</h2>
            <a
              href="https://console.firebase.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
            >
              Open console →
            </a>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Create a project → enable <strong>Email/Password</strong>, <strong>GitHub</strong>, and{' '}
            <strong>Anonymous</strong> sign-in methods → Add a web app → copy the config values. For Admin vars:{' '}
            <strong>Project settings → Service accounts → Generate new private key</strong>.
          </p>

          <div className="rounded-xl border border-border overflow-hidden">
            <EnvRow
              name="NEXT_PUBLIC_FIREBASE_API_KEY"
              hint="From your Firebase web app config"
              set={!!process.env.NEXT_PUBLIC_FIREBASE_API_KEY}
            />
            <EnvRow
              name="NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
              hint="From web app config — looks like your-project.firebaseapp.com"
              set={!!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}
            />
            <EnvRow
              name="NEXT_PUBLIC_FIREBASE_PROJECT_ID"
              hint="From web app config"
              set={!!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}
            />
            <EnvRow
              name="NEXT_PUBLIC_FIREBASE_APP_ID"
              hint="From web app config"
              set={!!process.env.NEXT_PUBLIC_FIREBASE_APP_ID}
            />
            <EnvRow
              name="NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"
              hint="From web app config — required for Analytics"
              set={!!process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}
            />
            <EnvRow
              name="FIREBASE_ADMIN_PROJECT_ID"
              hint="Project settings → Service accounts → project_id in the JSON"
              set={!!process.env.FIREBASE_ADMIN_PROJECT_ID}
            />
            <EnvRow
              name="FIREBASE_ADMIN_CLIENT_EMAIL"
              hint="Service account JSON → client_email"
              set={!!process.env.FIREBASE_ADMIN_CLIENT_EMAIL}
            />
            <EnvRow
              name="FIREBASE_ADMIN_PRIVATE_KEY"
              hint="Service account JSON → private_key. Wrap in double quotes in .env.local to preserve newlines."
              set={!!process.env.FIREBASE_ADMIN_PRIVATE_KEY}
              last
            />
          </div>
        </section>

        {/* Paddle section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-base font-semibold">Paddle</h2>
            <a
              href="https://sandbox-vendors.paddle.com/authentication"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
            >
              Open sandbox dashboard →
            </a>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Start with <strong>sandbox</strong> for local development. Switch to{' '}
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">production</code> when you go live.
          </p>

          <div className="rounded-xl border border-border overflow-hidden">
            <EnvRow
              name="NEXT_PUBLIC_PADDLE_ENV"
              hint='Set to "sandbox" for local dev, "production" for live'
              example="sandbox"
              set={!!process.env.NEXT_PUBLIC_PADDLE_ENV}
            />
            <EnvRow
              name="PADDLE_API_KEY"
              hint="Paddle dashboard → Developer tools → Authentication → API keys → Generate key"
              set={!!process.env.PADDLE_API_KEY}
            />
            <EnvRow
              name="NEXT_PUBLIC_PADDLE_CLIENT_TOKEN"
              hint="Paddle dashboard → Developer tools → Authentication → Client-side tokens → Generate"
              set={!!process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN}
            />
            <EnvRow
              name="PADDLE_NOTIFICATION_WEBHOOK_SECRET"
              hint="Paddle dashboard → Developer tools → Notifications → Add destination → Webhook → copy the secret key"
              set={!!process.env.PADDLE_NOTIFICATION_WEBHOOK_SECRET}
              last
            />
          </div>
        </section>

        {/* .env.local template */}
        <section>
          <h2 className="text-base font-semibold mb-3">Template</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Copy this into <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">.env.local</code> and fill
            in your values:
          </p>
          <pre className="bg-muted rounded-xl p-5 text-sm font-mono overflow-x-auto text-foreground leading-relaxed border border-border">
            {`# Supabase (database)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Firebase (auth + analytics)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=""

# Paddle
NEXT_PUBLIC_PADDLE_ENV=sandbox
PADDLE_API_KEY=
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=
PADDLE_NOTIFICATION_WEBHOOK_SECRET=`}
          </pre>
        </section>
      </div>
    </div>
  );
}

function EnvRow({
  name,
  hint,
  example,
  set,
  last = false,
}: {
  name: string;
  hint: string;
  example?: string;
  set: boolean;
  last?: boolean;
}) {
  return (
    <div className={`px-5 py-4 ${!last ? 'border-b border-border' : ''}`}>
      <div className="flex items-center justify-between gap-4 mb-1">
        <code className="text-sm font-mono font-medium">{name}</code>
        {set ? (
          <span className="text-xs text-green-600 font-medium shrink-0">set</span>
        ) : (
          <span className="text-xs text-red-500 font-medium shrink-0">missing</span>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{hint}</p>
      {example && (
        <code className="text-xs text-muted-foreground mt-1 block">
          e.g. <span className="text-foreground">{example}</span>
        </code>
      )}
    </div>
  );
}
