// Units
var minutes = 60
var hours = 3600
var days = 86400

// Dataset for timespan picker
export const rangeOptions = [
  { label: "1 year",      content: { type:"relative", value: 365, unit: "days" }},
  { label: "6 months",    content: { type:"relative", value: 180, unit: "days" }},
  { label: "3 months",    content: { type:"relative", value: 90, unit: "days" }},
  { label: "2 months",    content: { type:"relative", value: 60, unit: "days" }},
  { label: "1.5 months",  content: { type:"relative", value: 45, unit: "days" }},
  { label: "1 month",     content: { type:"relative", value: 30, unit: "days" }, tickLabel: "mo" },
  { label: "3 weeks",     content: { type:"relative", value: 21, unit: "days" }},
  { label: "2 weeks",     content: { type:"relative", value: 14, unit: "days" }},
  { label: "10 days",     content: { type:"relative", value: 10, unit: "days" }},
  { label: "7 days",      content: { type:"relative", value: 7, unit: "days" }, tickLabel: "w" },
  { label: "5 days",      content: { type:"relative", value: 5, unit: "days" }},
  { label: "3 days",      content: { type:"relative", value: 3, unit: "days" }},
  { label: "2 days",      content: { type:"relative", value: 2, unit: "days" }},
  { label: "1.5 days",    content: { type:"relative", value: 36, unit: "hours" }},
  { label: "1 day",       content: { type:"relative", value: 24, unit: "hours" }, tickLabel: "d" },
  { label: "18 hours",    content: { type:"relative", value: 18, unit: "hours" }},
  { label: "12 hours",    content: { type:"relative", value: 12, unit: "hours" }},
  { label: "9 hours",     content: { type:"relative", value: 9, unit: "hours" }},
  { label: "6 hours",     content: { type:"relative", value: 6, unit: "hours" }},
  { label: "4 hours",     content: { type:"relative", value: 4, unit: "hours" }},
  { label: "3 hours",     content: { type:"relative", value: 3, unit: "hours" }},
  { label: "2 hours",     content: { type:"relative", value: 2, unit: "hours" }},
  { label: "1.5 hours",   content: { type:"relative", value: 90, unit: "minutes" }},
  { label: "1 hour",      content: { type:"relative", value: 60, unit: "minutes" }, tickLabel: "h" },
  { label: "45 min",      content: { type:"relative", value: 45, unit: "minutes" }},
  { label: "30 min",      content: { type:"relative", value: 30, unit: "minutes" }},
  { label: "20 min",      content: { type:"relative", value: 20, unit: "minutes" }},
  { label: "15 min",      content: { type:"relative", value: 15, unit: "minutes" }},
  { label: "10 min",      content: { type:"relative", value: 10, unit: "minutes" }},
  { label: "5 min",       content: { type:"relative", value: 5, unit: "minutes" }},
  { label: "3 min",       content: { type:"relative", value: 3, unit: "minutes" }},
  { label: "2 min",       content: { type:"relative", value: 2, unit: "minutes" }},
  { label: "1 min",       content: { type:"relative", value: 60, unit: "seconds" }},
  { label: "30 sec",      content: { type:"relative", value: 30, unit: "seconds" }},
  { label: "15 sec",      content: { type:"relative", value: 15, unit: "seconds" }}
]

export default rangeOptions
