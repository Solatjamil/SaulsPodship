/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SACRED_LEXICON } from "./sacredData";

// Keep track of simple chat history context
interface ChatItem {
  role: 'user' | 'model';
  parts: [{ text: string }];
}
let chatHistory: ChatItem[] = [];

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        history: chatHistory,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Server responded with status ${response.status}`);
    }

    const data = await response.json();
    const reply = data.text || "No manuscript found.";
    
    // Update local history
    chatHistory.push({ role: 'user', parts: [{ text: message }] });
    chatHistory.push({ role: 'model', parts: [{ text: reply }] });
    
    return reply;
  } catch (error) {
    console.error("Theophilus Chat Error:", error);
    return "The archives are busy. Please try again soon.";
  }
};

export const performPolyglotSearch = async (query: string) => {
  const lowQuery = query.toLowerCase().trim();
  if (SACRED_LEXICON[lowQuery]) {
    return [SACRED_LEXICON[lowQuery]];
  }

  try {
    const response = await fetch("/api/polyglot-search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) throw new Error("Network response not ok");
    return await response.json();
  } catch (error) {
    console.error("Polyglot Search Error:", error);
    return [];
  }
};

export const performGlobalSearch = async (query: string, language: string) => {
  try {
    const response = await fetch("/api/global-search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, language }),
    });

    if (!response.ok) throw new Error("Network response not ok");
    return await response.json();
  } catch (error) {
    console.error("Global Search Error:", error);
    return [];
  }
};

export const enhanceToSuperNerdContent = async (category: any, language: string): Promise<string> => {
  try {
    const response = await fetch("/api/enhance-super-nerd-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: category.title,
        overview: category.overview,
        language,
      }),
    });

    if (!response.ok) throw new Error("Network response not ok");
    const data = await response.json();
    return data.text || "Analysis unavailable.";
  } catch (error) {
    console.error("Enhance Scholar Content Error:", error);
    return "The deep archives are currently unreachable.";
  }
};
