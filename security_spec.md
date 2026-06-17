# Firestore Security Specification and Red Team Attacks

## 1. Data Invariants
- **Message Integrity**: A guest message must contain valid `name`, `email`, `subject`, and `message` body fields (none empty or unreasonably long). It cannot be altered once sent.
- **Application Integrity**: A career application must map to an active `jobId` and include valid candidate contacts (`candidateEmail`, `candidatePhone`) and `resumeFileName`. It cannot be updated after filing.
- **Quote integrity**: Custom quotation requests must include client contact details and a substantial `requirements` definition. Only authenticated admins may view or delete quote documents.
- **Started Project Integrity**: Initiating a project plan must declare a recognized `planId`, `planName`, and valid client email block. No client can delete a project or change its completion states arbitrarily.
- **Access Privilege Control**: General public can `create` inquiries, applications, quotes, and project starts. Only verified administrators (`dhruviktra.rajput.1379@gmail.com`, `kshetrajnatechnologies@gmail.com`) can query (`list`), retrieve (`get`), or `delete` entries.

---

## 2. The "Dirty Dozen" Malicious Payloads

### Attack 1: Shadow Update Privilege Escalation
An attacker tries to update their regular user inquiry with an admin token field.
- **Payload**: `{ "id": "msg_999", "name": "Hack", "isAdmin": true, "email": "x@x.com", "subject": "A", "message": "B", "date": "16/06/2026" }`
- **Result**: `PERMISSION_DENIED` - Updates are locked / not permitted.

### Attack 2: Identity Spoofing (Falsifying Candidate Name)
An attacker submits an application mimicking a verified director's credentials.
- **Payload**: `{ "id": "app_1", "jobId": "eng", "jobTitle": "Lead", "candidateName": "CEO Dhruvik Vanol", "candidateEmail": "bad@actor.com", "candidatePhone": "0", "experienceYears": "5+", "resumeFileName": "virus.pdf", "date": "16" }`
- **Result**: `PERMISSION_DENIED` - If any email spoofing or unauthorized injection is attempted.

### Attack 3: Resource Poisoning (Massive Payload)
An attacker injects a 5MB strings payload inside the subject line to exhaust database sizing blocks.
- **Payload**: `{ "id": "msg_large", "name": "A", "email": "a@a.com", "subject": "[5MB String Data...]", "message": "Short body", "date": "16" }`
- **Result**: `PERMISSION_DENIED` - Sizing constraints on parameters demand strings under limit (e.g., subject <= 200).

### Attack 4: Orphaned Write (Undefined Job Reference)
An attacker files a job application referencing a non-existent vacancy identifier or malicious characters.
- **Payload**: `{ "id": "app_invalid_id", "jobId": "invalid!@#$!", "jobTitle": "Malicious", "candidateName": "A", "candidateEmail": "a@a.com", "candidatePhone": "1", "experienceYears": "0", "resumeFileName": "cv.pdf", "date": "16" }`
- **Result**: `PERMISSION_DENIED` - Valid security rules enforce formatted alphanumeric IDs.

### Attack 5: Terminal State Shortcutting (Project Instant Completed)
An attacker attempts to self-update their started project timeline database to status `completed` without review.
- **Payload**: `{ "id": "proj_1", "status": "completed", "planId": "accelerator", "clientEmail": "a@a.com" }`
- **Result**: `PERMISSION_DENIED` - Clients are restricted from updating started projects.

### Attack 6: Unauthenticated Scraper Collection Retrieval
An unauthenticated guest invokes `getDocs` to scan all corporate contact messages.
- **Attack**: `GET /databases/$(database)/documents/messages`
- **Result**: `PERMISSION_DENIED` - Public listing of messages is strictly blocked. Only administrators can query collection.

### Attack 7: Email Verification Spoofing
An attacker attempts to pass auth email claims with `email_verified: false` to claim administrative roles.
- **Request State**: `request.auth.token.email = "dhruviktra.rajput.1379@gmail.com"`, but `request.auth.token.email_verified = false`.
- **Result**: `PERMISSION_DENIED` - Rules strictly require `email_verified == true`.

### Attack 8: Immortal Field Rewriting
An attacker attempts to edit the `createdAt` or `date` field on a project to shift delivery time metrics.
- **Payload Update**: `{ "id": "proj_1", "date": "01/01/1970" }`
- **Result**: `PERMISSION_DENIED` - Fields are immutable.

### Attack 9: Falsified Invoice Quote
An attacker requests a custom quote with a self-assigned negative budget estimate.
- **Payload**: `{ "id": "q1", "estimatedBudget": "-$50,000", ... }`
- **Result**: `PERMISSION_DENIED` - Budget strings must pass validation specs.

### Attack 10: Denial-of-Wallet Recursive Leak
An attacker launches bulk index listings without passing authentication credentials.
- **Request**: List `/quotes` with general credentials.
- **Result**: `PERMISSION_DENIED` - Initial authentication checks fail-fast immediately before evaluating any O(n) DB read operations.

### Attack 11: Document ID Poisoning (Malicious Path Characters)
An attacker injects directory traversal strings into the document keys.
- **Path**: `/messages/../admins/hacker_id`
- **Result**: `PERMISSION_DENIED` - Document IDs must match strict `isValidId()` alphanumeric formatting rules.

### Attack 12: Anonymous Write to PII Profiles
An anonymous, unauthenticated attacker attempts to write directly into protected admin credentials.
- **Request**: Write `/admins/guest`
- **Result**: `PERMISSION_DENIED` - Catch-all default block isolates administrative systems.

---

## 3. The Security Tests Blueprint

```typescript
// firestore.rules.test.ts
import { assertFails, assertSucceeds, initializeTestEnvironment } from "@firebase/rules-unit-testing";

describe("Kshetrajna Technologies Fortress Rules", () => {
  it("locks down message collection list from unauthenticated users", async () => {
    const testEnv = await initializeTestEnvironment({ projectId: "gen-lang-client-0546387581" });
    const context = testEnv.unauthenticatedContext();
    await assertFails(context.firestore().collection("messages").get());
  });

  it("permits public to create contact messages", async () => {
    const testEnv = await initializeTestEnvironment({ projectId: "gen-lang-client-0546387581" });
    const context = testEnv.unauthenticatedContext();
    await assertSucceeds(context.firestore().collection("messages").add({
      id: "msg_valid_test_1",
      name: "Pranav Mehta",
      email: "pranav@vikas.com",
      phone: "+91 90000 00000",
      company: "Vikas Finance",
      subject: "Partnership Exploration",
      message: "Please consult with us on system-level database structures.",
      date: "16/06/2026 at 11:00 AM"
    }));
  });
});
```
