import { useState, useEffect } from 'react';

/**
 * Detects whether the current device is Mac/iOS or Windows/Linux/other,
 * and provides the appropriate keyboard shortcut representation.
 * 
 * - Mac / iOS: '⌘K' (Command + K)
 * - Windows / Linux / others: 'Ctrl K' (Control + K)
 * 
 * Includes URL query param override (?os=windows, ?os=linux, ?os=mac)
 * for testing and previewing across platforms.
 */
export function getPlatformInfo() {
  if (typeof window === 'undefined') {
    return { isMac: false, os: 'other', shortcutLabel: 'Ctrl K', modifier: 'Ctrl' };
  }

  // Allow explicit preview/override via query param: e.g. ?os=windows or ?os=linux
  try {
    const params = new URLSearchParams(window.location.search);
    const osParam = params.get('os')?.toLowerCase();
    if (osParam === 'windows' || osParam === 'win') {
      return { isMac: false, os: 'windows', shortcutLabel: 'Ctrl K', modifier: 'Ctrl' };
    }
    if (osParam === 'linux') {
      return { isMac: false, os: 'linux', shortcutLabel: 'Ctrl K', modifier: 'Ctrl' };
    }
    if (osParam === 'mac' || osParam === 'macos' || osParam === 'apple') {
      return { isMac: true, os: 'mac', shortcutLabel: '⌘K', modifier: '⌘' };
    }
  } catch (e) {
    // Ignore URL parse error
  }

  // 1. Modern User-Agent Client Hints API (Chrome, Edge, modern Chromium)
  const navPlatform = navigator.userAgentData?.platform;
  if (typeof navPlatform === 'string' && navPlatform.length > 0) {
    const isApple = /mac/i.test(navPlatform) || /ios/i.test(navPlatform);
    if (isApple) {
      return { isMac: true, os: 'mac', shortcutLabel: '⌘K', modifier: '⌘' };
    }
    const isWindows = /windows/i.test(navPlatform);
    const isLinux = /linux/i.test(navPlatform);
    return {
      isMac: false,
      os: isWindows ? 'windows' : isLinux ? 'linux' : 'other',
      shortcutLabel: 'Ctrl K',
      modifier: 'Ctrl'
    };
  }

  // 2. Fallback to navigator.platform & navigator.userAgent (Safari, Firefox, older browsers)
  const platform = (navigator.platform || '').toLowerCase();
  const userAgent = (navigator.userAgent || '').toLowerCase();

  const isApple = 
    platform.includes('mac') || 
    platform.includes('iphone') || 
    platform.includes('ipad') || 
    platform.includes('ipod') ||
    userAgent.includes('macintosh') ||
    userAgent.includes('mac os x');

  if (isApple) {
    return { isMac: true, os: 'mac', shortcutLabel: '⌘K', modifier: '⌘' };
  }

  const isWindows = platform.includes('win') || userAgent.includes('windows');
  const isLinux = platform.includes('linux') || userAgent.includes('linux') || userAgent.includes('x11');

  return {
    isMac: false,
    os: isWindows ? 'windows' : isLinux ? 'linux' : 'other',
    shortcutLabel: 'Ctrl K',
    modifier: 'Ctrl'
  };
}

export function usePlatformShortcut() {
  const [platformInfo, setPlatformInfo] = useState(getPlatformInfo);

  useEffect(() => {
    // Sync on mount
    setPlatformInfo(getPlatformInfo());
  }, []);

  return platformInfo;
}

export default usePlatformShortcut;
