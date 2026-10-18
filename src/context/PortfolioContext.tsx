import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData } from '../types';
import { INITIAL_PORTFOLIO_DATA } from '../data/defaultPortfolio';

interface PortfolioContextType {
  portfolio: PortfolioData;
  isLoading: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const BROADCAST_CHANNEL_NAME = 'portfolio_realtime_sync';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolio, setPortfolio] = useState<PortfolioData>(() => {
    const cached = localStorage.getItem('local_portfolio_cache');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_PORTFOLIO_DATA;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // BroadcastChannel for instant cross-tab sync in browser
  useEffect(() => {
    let bc: BroadcastChannel | null = null;
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      bc = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      bc.onmessage = (event) => {
        if (event.data && event.data.type === 'SYNC' && event.data.payload) {
          setPortfolio(event.data.payload);
          localStorage.setItem('local_portfolio_cache', JSON.stringify(event.data.payload));
        }
      };
    }
    return () => {
      bc?.close();
    };
  }, []);

  // Fetch initial portfolio from API and setup SSE listener
  useEffect(() => {
    let isMounted = true;

    // Fetch initial
    fetch('/api/portfolio')
      .then((res) => {
        if (!res.ok) throw new Error('API unavailable');
        return res.json();
      })
      .then((data) => {
        if (isMounted && data && data.profile) {
          setPortfolio(data);
          localStorage.setItem('local_portfolio_cache', JSON.stringify(data));
        }
      })
      .catch((err) => {
        console.warn('Initial fetch from server failed, using cached/seed data:', err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    // Server-Sent Events for server-side real-time synchronization
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/events');
      eventSource.onmessage = (e) => {
        try {
          const updated = JSON.parse(e.data);
          if (updated && updated.profile) {
            setPortfolio(updated);
            localStorage.setItem('local_portfolio_cache', JSON.stringify(updated));
          }
        } catch (err) {
          console.error('Error parsing SSE event:', err);
        }
      };

      eventSource.onerror = () => {
        console.warn('SSE connection re-establishing...');
      };
    } catch (e) {
      console.warn('EventSource initialization fallback:', e);
    }

    return () => {
      isMounted = false;
      eventSource?.close();
    };
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        isLoading
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
