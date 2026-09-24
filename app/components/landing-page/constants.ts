export const navLinks = [
  { label: "Principles", href: "#principles" },
  { label: "Heatmap", href: "#heatmap" },
  { label: "Streak Freeze", href: "#streak-freeze" },
  { label: "AI Inights", href: "#ai-insights" },
];

export const principles = [
  {
    label: "Consistency over intensity",
    content:
      "Focus on small, repeatable actions every day. Long-term progress stems from gentle, steady momentum rather than intense bursts that lead to burnout.",
  },
  {
    label: "Clarity through data",
    content:
      "Understand your true patterns with clean, uncluttered visual feedback. Objective data shows you exactly how far you've come without judgment.",
  },
  {
    label: "Gentle accountability",
    content:
      "Encouraging feedback designed to support your journey. Loopin gives you calm, honest motivation to stay on track on your own terms.",
  },
];

export const features = [
  {
    id: "heatmap",
    label: "PROGRESS HEATMAP",
    title: "Visualize your consistency at a single glance",
    description:
      "See the bigger picture of your progress. Loopin turns your daily habits into an intuitive visual matrix. Watch your active days build up over time.",
    image: "/images/heatmap.webp",
    imageAlt: "Yearly contribution heatmap showing daily habit activity",
    imageWidth: 1939,
    imageHeight: 717,
    frameWidth: "max-w-[600px]",
  },
  {
    id: "streak-freeze",
    label: "STREAK FREEZE",
    title: "Life happens. Your streak stays",
    description:
      "A streak protection feature for count-based habits. When a daily goal isn't met, the habit is marked as 'Frozen' to preserve the streak for up to 3 days. Encourages consistency without all-or-nothing pressure.",
    image: "/images/freezeHabitCard.webp",
    imageAlt: "Habit card showing frozen streak",
    imageWidth: 846,
    imageHeight: 960,
    frameWidth: "max-w-[400px]",
  },
  {
    id: "ai-insights",
    label: "AI INSIGHT",
    title: "Personalized insight based on your habit history",
    description:
      "Loopin's integrated AI coach analyzes your patterns to provide calm, constructive analysis. Understand which days of the week you thrive, discover potential triggers for missed habits, and receive gentle encouragement when you need it most.",
    image: "/images/aiInsight.webp",
    imageAlt: "AI-generated daily and weekly habit insights",
    imageWidth: 984,
    imageHeight: 453,
    frameWidth: "max-w-[600px]",
  },
];
