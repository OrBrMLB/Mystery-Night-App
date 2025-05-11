-- Enable RLS if not already done
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Allow only authenticated users to select their own events
CREATE POLICY "Allow select own events"
ON public.events
FOR SELECT
USING (auth.uid() = user_id);

-- Allow only authenticated users to insert their own events
CREATE POLICY "Allow insert own events"
ON public.events
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Allow only authenticated users to update their own events
CREATE POLICY "Allow update own events"
ON public.events
FOR UPDATE
USING (auth.uid() = user_id);

-- Allow only authenticated users to delete their own events
CREATE POLICY "Allow delete own events"
ON public.events
FOR DELETE
USING (auth.uid() = user_id);
