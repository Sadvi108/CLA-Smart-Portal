"use client";

import React, { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "cla_ticket";

type Message = { role: "user" | "assistant"; content: string; at: number };
type TicketState = {
  ticketId: string;
  queuePos: number;
  initialQueuePos?: number;
};

function formatTicketETA(queuePos: number) {
  const minutes = Math.max(3, queuePos * 5);
  return `${minutes}-${minutes + 5} minutes`;
}

function approxReleaseEstimate(): string {
  const now = new Date();
  const hours = 24 + Math.floor(Math.random() * 48); // 24–72 hours
  const eta = new Date(now.getTime() + hours * 60 * 60 * 1000);
  return `${eta.toLocaleDateString()} ${eta.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false);

  // Ticket state (unified)
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [queuePos, setQueuePos] = useState<number | null>(null);
  const [initialQueuePos, setInitialQueuePos] = useState<number | null>(null);

  // AI/chat state
  const [tab, setTab] = useState("ai");
  const [input, setInput] = useState("");
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const queueTimerRef = useRef<number | null>(null);

  // Helpline form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [urgent, setUrgent] = useState(false);

  // Direct email state
  const [mailTo, setMailTo] = useState("support@clap.my");
  const [mailSubject, setMailSubject] = useState("");
  const [mailBody, setMailBody] = useState("");

  // Messages state (was missing)
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello — how can I help you today?", at: Date.now() },
  ]);

  // Restore existing ticket from localStorage if present
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as TicketState;
        if (parsed?.ticketId && typeof parsed.queuePos === "number") {
          setTicketId(parsed.ticketId);
          setQueuePos(parsed.queuePos);
          setInitialQueuePos(parsed.initialQueuePos ?? parsed.queuePos);
        }
      }
    } catch {}
  }, []);

  // Start a smooth countdown for queue position (simulated)
  useEffect(() => {
    if (!ticketId || queuePos == null) return;
    if (queueTimerRef.current != null) return; // already running
    queueTimerRef.current = window.setInterval(() => {
      setQueuePos((prev) => {
        if (prev == null) return prev;
        const next = Math.max(1, prev - 1);
        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              ticketId,
              queuePos: next,
              initialQueuePos: initialQueuePos ?? prev,
            })
          );
        } catch {}
        return next;
      });
    }, 10000); // advance every 10s
    return () => {
      if (queueTimerRef.current != null) {
        clearInterval(queueTimerRef.current);
        queueTimerRef.current = null;
      }
    };
  }, [ticketId, queuePos, initialQueuePos]);

  // Animate dialog entrance/exit smoothly
  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(id);
    } else {
      setEntered(false);
    }
  }, [open]);

  // Smooth auto-scroll to newest message
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, open, tab]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { role: "user", content: text, at: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Generate a response
    const lower = text.toLowerCase();
    let reply = "Thanks for your question. I can provide general guidance.";
    if (lower.includes("release") || lower.includes("eta") || lower.includes("container")) {
      reply = `Approximate container release: ${approxReleaseEstimate()}. Actual time can vary based on documentation, customs, and port workload.`;
    } else if (lower.includes("login") || lower.includes("password")) {
      reply = "You can reset your password from the login page. If you still cannot access, contact Helpline with your registered email.";
    } else if (lower.includes("marketplace")) {
      reply = "Marketplace is protected. Please sign in first, then navigate to the Marketplace from the sidebar.";
    } else if (lower.includes("insight") || lower.includes("report")) {
      reply = "Insights show predictions and recommendations. Use filters at the top to refine the view.";
    }

    const assistantMsg: Message = { role: "assistant", content: reply, at: Date.now() };
    setTimeout(() => setMessages((prev) => [...prev, assistantMsg]), 400);
  }

  function handleAnalyzeDemo() {
    const assistantMsg: Message = {
      role: "assistant",
      content: "Analyzing your portal data… Current throughput looks stable; next reload is likely within 24–48 hours. You have 3 active shipments and 1 pending payment.",
      at: Date.now(),
    };
    setMessages((prev) => [...prev, assistantMsg]);
  }

  // Helpline submission (creates ticket)
  function submitTicket() {
    if (!name || !email || !subject || !details) return;
    const id = `CLA-${Date.now().toString().slice(-6)}`;
    const pos = Math.floor(Math.random() * 6) + 3; // position 3–8
    setTicketId(id);
    setQueuePos(pos);
    setInitialQueuePos(pos);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ticketId: id, queuePos: pos, initialQueuePos: pos }));
    } catch {}
  }

  function mailtoHref() {
    const to = encodeURIComponent(mailTo);
    const sub = encodeURIComponent(mailSubject || "Customer Inquiry");
    const body = encodeURIComponent(mailBody || "Hello CLA Team,\n\n");
    return `mailto:${to}?subject=${sub}&body=${body}`;
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setEntered(false);
    window.setTimeout(() => setOpen(false), 200);
  };

  // Floating CTA - start a quick chat (creates lightweight ticket)
  const handleCreateTicket = () => {
    const id = `T-${Math.floor(Math.random() * 900000 + 100000)}`;
    const pos = Math.floor(Math.random() * 8) + 2;
    setTicketId(id);
    setQueuePos(pos);
    setInitialQueuePos(pos);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ticketId: id, queuePos: pos }));
    } catch {}
    setOpen(true);
  };

  const handleClearTicket = () => {
    setTicketId(null);
    setQueuePos(null);
    setInitialQueuePos(null);
    if (queueTimerRef.current != null) {
      clearInterval(queueTimerRef.current);
      queueTimerRef.current = null;
    }
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <>
      {/* Floating action button - stays at bottom */}
      <div className="fixed right-6 bottom-6 z-50">
        <Button
          onClick={() => (open ? handleClose() : handleOpen())}
          size="icon"
          className="w-14 h-14 p-0 rounded-full bg-sky-600 hover:bg-sky-700 text-white shadow-xl"
          aria-expanded={open}
          aria-controls="chat-panel"
          aria-label="Open chat"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            {queuePos != null && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {queuePos}
              </span>
            )}
          </div>
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent 
          className={`fixed top-6 right-6 w-[320px] sm:w-[360px] max-w-full p-0 border-0 shadow-2xl overflow-hidden rounded-xl motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out ${entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"} h-[80vh] max-h-[85vh] flex flex-col`}
          style={{ transformOrigin: "top right" }}
        >
          <DialogHeader className="px-4 pt-4">
            <DialogTitle>Customer Support</DialogTitle>
            <DialogDescription>
              Choose a help channel. AI Chat answers portal questions; Helpline uses a ticket queue; Direct Email lets you email CLA.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 min-h-0">
            <Tabs value={tab} onValueChange={(v) => setTab(String(v))} className="w-full h-full">
              <div className="px-4">
                <TabsList className="grid grid-cols-3 sticky top-0 z-10 bg-background rounded-lg p-1 shadow-md md:shadow-lg border border-border/60">
                  <TabsTrigger value="ai" className="data-[state=active]:!bg-sky-50">AI Chat</TabsTrigger>
                  <TabsTrigger value="help" className="data-[state=active]:!bg-sky-50">Helpline</TabsTrigger>
                  <TabsTrigger value="email" className="data-[state=active]:!bg-sky-50">Direct Email</TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="px-4 pb-4 flex-1 min-h-0 overscroll-contain pb-[env(safe-area-inset-bottom)]">
                <TabsContent value="ai" className="mt-4 min-h-0">
                  <div className="rounded-xl border border-border dark:border-neutral-800 bg-white dark:bg-black text-foreground shadow-md">
                    <div ref={messagesRef} className="max-h-[40vh] overflow-y-auto space-y-3 px-4 py-3">
                      {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.role === "assistant" ? "justify-start" : "justify-end"} transition-all duration-300`}>
                          <div
                            className={`${m.role === "assistant"
                              ? "bg-sky-50 text-sky-900 border border-sky-100 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700"
                              : "bg-primary/10 text-foreground border border-primary/20 dark:bg-sky-900/40 dark:text-sky-100 dark:border-sky-800"} rounded-lg px-3 py-2 shadow-sm max-w-[90%]`}
                          >
                            <span className="font-medium">{m.role === "assistant" ? "Assistant" : "You"}:</span> {m.content}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="flex gap-2 px-4 py-3">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about the portal, release ETA, etc."
                        className="bg-white dark:bg-neutral-900 text-foreground dark:text-neutral-100 placeholder:text-muted-foreground dark:placeholder:text-neutral-400 border-border dark:border-neutral-700 focus-visible:ring-[3px] focus-visible:ring-sky-300/60"
                      />
                      <Button onClick={handleSend}>Send</Button>
                      <Button variant="secondary" onClick={handleAnalyzeDemo}>Analyze</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="help" className="mt-4 min-h-0">
                  {!ticketId ? (
                    <div className="space-y-3">
                      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" type="email" />
                      <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
                      <Textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Describe your urgent issue" rows={4} />
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-muted-foreground flex items-center gap-2">
                          <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} />
                          Mark as urgent
                        </label>
                        <Button onClick={submitTicket}>Get Ticket</Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Submitting creates a queue ticket to connect you with an employee in serial order.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm">Ticket created: <span className="font-mono font-medium">{ticketId}</span></p>
                      {queuePos !== null && (
                        <>
                          <p className="text-sm text-muted-foreground" aria-live="polite">Your current position: <span className="font-medium">#{queuePos}</span> • Estimated wait {formatTicketETA(queuePos)}</p>
                          {initialQueuePos && initialQueuePos > 1 && (
                            <div className="mt-2">
                              <div className="h-2 w-full rounded bg-muted overflow-hidden">
                                <div
                                  className="h-full bg-primary transition-[width] duration-700 ease-out"
                                  style={{ width: `${Math.min(100, Math.max(0, ((initialQueuePos - (queuePos ?? initialQueuePos)) / (initialQueuePos - 1)) * 100))}%` }}
                                />
                              </div>
                              <p className="mt-1 text-xs text-muted-foreground">Queue advancing…</p>
                            </div>
                          )}
                        </>
                      )}
                      <p className="text-xs text-muted-foreground">Keep this window open. We'll notify you when an employee is available.</p>
                      <div className="flex gap-2 pt-2">
                        <Button onClick={() => setOpen(false)}>Close</Button>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setTicketId(null);
                            setQueuePos(null);
                            setInitialQueuePos(null);
                            if (queueTimerRef.current != null) {
                              clearInterval(queueTimerRef.current);
                              queueTimerRef.current = null;
                            }
                            localStorage.removeItem(STORAGE_KEY);
                          }}
                        >
                          New Ticket
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="email" className="mt-4 min-h-0">
                  <div className="space-y-3">
                    <Input value={mailTo} onChange={(e) => setMailTo(e.target.value)} placeholder="To" type="email" />
                    <Input value={mailSubject} onChange={(e) => setMailSubject(e.target.value)} placeholder="Subject" />
                    <Textarea value={mailBody} onChange={(e) => setMailBody(e.target.value)} placeholder="Write your message to CLA" rows={6} />
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">This opens your email client with a prefilled draft.</p>
                      <Button asChild className="shadow-sm hover:shadow-md">
                        <a href={mailtoHref()}>Send via Email</a>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}