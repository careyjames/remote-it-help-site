---
layout: default
title: DNS Tool - Command-Line DNS & Email Security Auditor
---

# DNS Tool 🛠️

**DNS Tool** is a command-line utility for comprehensive DNS and email security auditing. It provides a one-stop solution to verify critical DNS records (DMARC, SPF, DKIM, DNSSEC, etc.) and offers real-time feedback on your domain’s configuration. Designed for network administrators, cybersecurity professionals, and IT engineers, DNS Tool helps prevent email spoofing (e.g., BEC attacks) and fortify your domain’s DNS infrastructure by giving an easy bird’s-eye view of all essential records.

**Find it on GitHub:** [careyjames/dns-tool](https://github.com/careyjames/dns-tool/)

## Why DNS Tool Exists

I built DNS Tool out of frustration with juggling multiple DNS lookup tools. As I often say:
“If your DMARC says `p=none`, your work’s not done—get to `p=reject`!”

Too many domains have a DMARC policy of `p=none` (monitoring only), which merely reports spoofing rather than preventing it. Enforcing `p=reject` is crucial to actively blocking fraudulent emails. However, achieving full email security means verifying SPF and DKIM alignment and extending protection with DNSSEC, MTA-STS, DANE, and more.

Before creating the DNS Tool, checking all these meant hopping between separate utilities: one for SPF, another for DMARC, another for DKIM, plus others for DNSSEC, TLSA, CAA, etc. It was time-consuming and error-prone, especially when propagating DNS changes and needing “live” re-checks. I often copy-pasted domains across half a dozen sites to validate each record type.

## One Tool to Check Them All

That’s why **DNS Tool** (originally called DNS Scout) was born. It consolidates all key DNS and email security checks into a single command:

* **Comprehensive Record Coverage:** In one run, DNS Tool checks NS, A, AAAA, MX, TXT, SPF, DMARC, DKIM, MTA-STS, DANE, BIMI, DNSSEC, CAA, SOA, and PTR records. It also performs an RDAP lookup (with WHOIS fallback) to identify the domain’s registrar.
* **Immediate, Color-Coded Feedback:** Results are printed in color with intuitive symbols – ✅ for passes, ❌ for problems, and ⚠️ for warnings – so you can spot misconfigurations at a glance. Missing records or unsafe settings are highlighted with context and best-practice suggestions.
* **Interactive & Batch Modes:** You can use the DNS Tool in an interactive prompt (with command history and tab completion via Prompt Toolkit) or run it in batch mode to scan multiple domains in one go. You get instant insight into each domain’s DNS health in both cases.
* **Built for Real-Time Iteration:** Correct a DNS setting and re-run the tool immediately to see if the issue is resolved. There is no need to wait or use external web tools—the DNS Tool lets you validate changes as soon as they propagate.
* **Portable, Single-Binary Utility:** DNS Tool is compiled into a single self-contained binary with all Python dependencies bundled. No Python installation is required on the target system, and it works out of the box across Linux, macOS, and Windows.

In short, I was tired of switching between various DNS checkers, so I built one tool to do it all. Now, whether I’m ensuring a domain’s DMARC is set to `p=reject` or confirming that DNSSEC and MTA-STS are configured correctly, I can run `dnstool` and get a complete report in seconds. This unified approach saves time and reduces the chance of overlooking something critical.

## Example Output

Below are sample outputs from DNS Tool, illustrating how it highlights issues versus a clean bill of health. *(Note: For a live website, we can't embed screenshots directly in Markdown easily without adding them to the site's assets. Consider adding these as actual images to your `assets/img` directory and linking them if you want the visual output here, or describe them as below).*

**Misconfigured Domain (example: `monstrico.com`):**
The tool would flag a malformed SPF and DMARC record, nonexistent MX entries, etc., using ❌ and ⚠️ symbols for each issue. For example:
* TXT Records found: ✅
* SPF: ❌ Malformed record!
* DMARC: ⚠️ `p=none` (Your work's not done!)

*(Note: In the misconfigured domain example, it shows a ✅ by the TXT Records found because it did find TXT records; below in the SPF section, it clarifies that the records are malformed.)*

**Properly Configured Domain (example: `it-help.tech`):**
This would show a domain with all the recommended records. Notice the ✅ symbols indicating pass status for each check.

These outputs show how the DNS Tool provides clear indicators. For example, an ❌ “SPF: Missing” or ⚠️ “DMARC: p=none” warning stands out immediately. This makes it easy to identify what needs fixing to improve your domain’s security posture.

## Download and Installation

DNS Tool is available as pre-compiled binaries for major platforms (Linux, macOS, Windows). Download the appropriate release for your system from the [**GitHub Releases Page**](https://github.com/careyjames/dns-tool/releases).

| Release Asset                     | Supported Systems                                       |
| :-------------------------------- | :------------------------------------------------------ |
| `dnstool-linux-amd64-glibc-<ver>` | Linux x86_64 (glibc-based: Ubuntu, Debian, Fedora, Kali) |
| `dnstool-linux-arm64-glibc-<ver>` | Linux ARM64 (Raspberry Pi OS 64-bit, Ubuntu ARM)        |
| `dnstool-macos-intel-<ver>`       | macOS (Intel CPUs)                                      |
| `dnstool-macos-silicon-<ver>`     | macOS (Apple Silicon M1/M2)                             |
| `dnstool-windows-amd64-<ver>.exe` | Windows 10/11 (x86_64)                                  |

*(Replace `<ver>` with the actual version number)*

### Linux
1.  Download the Linux binary (e.g., `dnstool-linux-amd64-glibc`) from Releases.
2.  Make it executable: `chmod +x dnstool-linux-amd64-glibc-<version>`
3.  Run: `./dnstool-linux-amd64-glibc-<version> --help`
4.  (Optional) Move to path: `sudo mv dnstool-linux-amd64-glibc-<version> /usr/local/bin/dnstool`
    *(Note: Requires a relatively recent glibc. Build from source on older systems if needed.)*

### macOS
1.  Download the appropriate macOS binary.
2.  Allow it to run (bypass Gatekeeper):
    * **Finder:** Right-click, select “Open,” confirm. Or go to System Preferences → Security & Privacy → General → “Allow Anyway.”
    * **Terminal:** `chmod +x dnstool-macos-*` then `xattr -d com.apple.quarantine dnstool-macos-*`. Then run with `./dnstool-macos-*`.

### Windows
1.  Download the Windows executable.
2.  Run by double-clicking or from Command Prompt/PowerShell: `.\dnstool-windows-amd64-<version>.exe`
3.  If SmartScreen warns, click “More info” then “Run anyway.”

## Usage

DNS Tool can be used in **Interactive Mode** or **Batch Mode**.

### Interactive Mode
Run `dnstool` with no arguments:
```bash
$ ./dnstool
Type a domain at the Domain: prompt and press Enter. Use Up/Down arrows for history. Type exit or press Enter on an empty line to quit.

Example interactive output:

🔍 NS Records:
✅ Found NS:
sean.ns.cloudflare.com.
ursula.ns.cloudflare.com.
 
🔍 SPF (Sender Policy Framework):
❌ No TXT => no SPF record! (❌ Required for mail deliverability and DMARC compliance.)

🔍 DMARC:
⚠️ DMARC p=none => "Your work’s not done!"
"v=DMARC1; p=none;"
Batch Mode
Check multiple domains:

Bash

$ ./dnstool example.com example.org test.co
Or from a file (one domain per line):

Bash

$ ./dnstool -f domains.txt
Custom DNS Resolvers
Uses 1.1.1.1, 8.8.8.8, 9.9.9.9 by default. Override with --resolver or -r:

Bash

$ ./dnstool --resolver 1.1.1.1 --resolver 8.8.8.8 example.com
Authoritative Lookups
Query a domain’s authoritative nameservers directly with -a / --authoritative:

Bash

$ ./dnstool --authoritative example.com
--authoritative ⇒ ground truth at the domain’s own servers.
Default (recursive) ⇒ watch propagation across public caches.
Verbose / Debug Mode
Use -v / --verbose for more insight:

Bash

$ ./dnstool -v example.com
Getting Help
Run dnstool -h or dnstool --help for a usage summary.

Building from Source
(Requires Python 3.7+)

Clone: git clone https://github.com/careyjames/dns-tool.git && cd dns-tool
Install dependencies (preferably in a virtual environment):
Bash

python3 -m venv buildenv
source buildenv/bin/activate
pip install -r requirements.txt
Compile: pyinstaller --onefile dnstool.py (Binary will be in dist/)
Running Tests
Install pytest and run pytest from the project root.

FAQ
Q: Why is Windows complaining about an “unknown publisher”? A: The Windows executable is not currently code-signed. Click “More info” then “Run anyway.”
Q: How do I run the macOS binary if Gatekeeper blocks it? A: Right-click and "Open," or use System Preferences, or use chmod +x and xattr -d com.apple.quarantine in Terminal.
Q: Does the Linux binary work on all distributions? A: Should run on most modern glibc-based systems. If you see "GLIBC_XX not found" on an older distro, compile from source.
Q: Do I need to install anything for history/colors? A: No, necessary libraries are bundled. History is saved to ~/.domain_history_rdap_interactive.
Q: Can I check hundreds of domains? A: Yes, via batch mode. Be mindful of time and query rates.
