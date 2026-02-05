"""
Traffic Simulator for IITJ Senate Portal
Simulates natural user visits - max 60 users over 3 hours
"""

import requests
import random
import time
from datetime import datetime, timedelta

# Configuration
BASE_URL = "https://iitj-senate-portal.vercel.app"
TOTAL_USERS = 60
DURATION_HOURS = 3
DURATION_SECONDS = DURATION_HOURS * 60 * 60  # 10800 seconds

# Common user agents to simulate different browsers/devices
USER_AGENTS = [
    # Chrome on Windows
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    # Firefox on Windows
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
    # Chrome on Mac
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    # Safari on Mac
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
    # Chrome on Android
    "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
    # Safari on iPhone
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1",
    # Edge on Windows
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
    # Chrome on Linux
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    # Firefox on Mac
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0",
]

# Pages to visit (simulating natural navigation)
PAGES = [
    "/",
    "/",  # Homepage visited more often
    "/",
]

# Referrers to simulate traffic sources
REFERRERS = [
    "",  # Direct visit
    "",
    "https://www.google.com/",
    "https://www.google.co.in/",
    "",  # Direct visit
    "https://iitj.ac.in/",
    "",
]


def generate_random_intervals(total_users, duration_seconds):
    """Generate random intervals that sum up to approximately the duration"""
    # Average interval
    avg_interval = duration_seconds / total_users
    
    intervals = []
    for _ in range(total_users):
        # Random interval with some variance (between 50% and 200% of average)
        # This creates natural-looking gaps
        min_interval = avg_interval * 0.3
        max_interval = avg_interval * 2.5
        interval = random.uniform(min_interval, max_interval)
        intervals.append(interval)
    
    # Normalize to fit within duration
    total = sum(intervals)
    scale_factor = duration_seconds / total
    intervals = [i * scale_factor for i in intervals]
    
    return intervals


def simulate_user_visit(session_num):
    """Simulate a single user visit"""
    user_agent = random.choice(USER_AGENTS)
    referrer = random.choice(REFERRERS)
    page = random.choice(PAGES)
    
    headers = {
        "User-Agent": user_agent,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Cache-Control": "max-age=0",
    }
    
    if referrer:
        headers["Referer"] = referrer
    
    url = f"{BASE_URL}{page}"
    
    try:
        response = requests.get(url, headers=headers, timeout=30)
        status = response.status_code
        
        # Simulate page load time (reading content)
        read_time = random.uniform(2, 15)
        time.sleep(read_time)
        
        # Sometimes users visit multiple pages (30% chance)
        if random.random() < 0.3:
            additional_page = random.choice(PAGES)
            additional_url = f"{BASE_URL}{additional_page}"
            requests.get(additional_url, headers=headers, timeout=30)
            extra_read = random.uniform(3, 20)
            time.sleep(extra_read)
        
        return True, status
    except Exception as e:
        return False, str(e)


def run_simulation():
    """Run the traffic simulation"""
    print("=" * 60)
    print("IITJ Senate Portal Traffic Simulator")
    print("=" * 60)
    print(f"Target URL: {BASE_URL}")
    print(f"Total Users: {TOTAL_USERS}")
    print(f"Duration: {DURATION_HOURS} hours")
    print(f"Average interval: ~{DURATION_SECONDS // TOTAL_USERS} seconds between visits")
    print("=" * 60)
    
    start_time = datetime.now()
    end_time = start_time + timedelta(hours=DURATION_HOURS)
    
    print(f"Started at: {start_time.strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Will end at: {end_time.strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)
    print()
    
    # Generate random intervals
    intervals = generate_random_intervals(TOTAL_USERS, DURATION_SECONDS)
    
    successful = 0
    failed = 0
    
    for i in range(TOTAL_USERS):
        current_time = datetime.now()
        
        print(f"[{current_time.strftime('%H:%M:%S')}] User {i + 1}/{TOTAL_USERS} visiting...", end=" ")
        
        success, result = simulate_user_visit(i + 1)
        
        if success:
            successful += 1
            print(f"✓ Status: {result}")
        else:
            failed += 1
            print(f"✗ Error: {result}")
        
        # Wait before next user (except for the last one)
        if i < TOTAL_USERS - 1:
            wait_time = intervals[i]
            next_visit = datetime.now() + timedelta(seconds=wait_time)
            print(f"    Next visit in {wait_time:.0f} seconds (at {next_visit.strftime('%H:%M:%S')})")
            print()
            time.sleep(wait_time)
    
    # Summary
    print()
    print("=" * 60)
    print("SIMULATION COMPLETE")
    print("=" * 60)
    print(f"Total visits: {TOTAL_USERS}")
    print(f"Successful: {successful}")
    print(f"Failed: {failed}")
    print(f"Duration: {datetime.now() - start_time}")
    print("=" * 60)


if __name__ == "__main__":
    try:
        run_simulation()
    except KeyboardInterrupt:
        print("\n\nSimulation interrupted by user.")
