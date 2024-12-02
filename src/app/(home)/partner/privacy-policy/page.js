import React from "react";
import { HomeFooter, HomeHeader } from "@/components";
import { cdnUrl } from "@/util/server";


function PrivacyPolicy() {
  return (
    <>
      <HomeHeader logo={cdnUrl("img/vtt-cabs-partner.svg")} bg="transparent" />
      <div class="container card my-5">
        <div className="card-header">
          <h1 class="text-center mb-4">Terms and Conditions</h1>
        </div>
        <div className="card-body">
          <section class="mb-4">
            <h2>1. Introduction</h2>
            <p>
              These terms and conditions govern the registration, rights, and
              responsibilities of vendors registering with VTTCABS PRIVATE
              LIMITED ("Company"). By registering as a vendor, you agree to
              comply with these terms and conditions.
            </p>
          </section>

          <section class="mb-4">
            <h2>2. Vendor Eligibility</h2>
            <p>
              Vendors must provide accurate and complete information during
              registration. Vendors must be legally authorized to provide
              services and enter into binding agreements in the region of
              operation.
            </p>
          </section>

          <section class="mb-4">
            <h2>3. Vendor Obligations</h2>
            <ul>
              <li>
                <strong>Service Quality:</strong> Vendors agree to provide
                reliable and timely services to customers using VTTCABS PRIVATE
                LIMITED's platform.
              </li>
              <li>
                <strong>Compliance:</strong> Vendors must comply with all
                applicable laws, regulations, and VTTCABS policies, including
                licensing and safety standards.
              </li>
              <li>
                <strong>Insurance:</strong> Vendors must maintain valid and
                appropriate insurance coverage as required by law.
              </li>
            </ul>
          </section>

          <section class="mb-4">
            <h2>4. Vendor Responsibilities</h2>
            <ul>
              <li>
                <strong>Accurate Information:</strong> Vendors are responsible
                for providing accurate and up-to-date information on the
                platform, including vehicle and driver details.
              </li>
              <li>
                <strong>Customer Service:</strong> Vendors are expected to
                maintain a professional demeanor and offer excellent customer
                service at all times.
              </li>
            </ul>
          </section>

          <section class="mb-4">
            <h2>5. Payment Terms</h2>
            <ul>
              <li>
                <strong>Commission:</strong> VTTCABS PRIVATE LIMITED will deduct
                a commission percentage from each transaction processed through
                the platform. The percentage will be determined during the
                registration process.
              </li>
              <li>
                <strong>Payouts:</strong> Vendor payouts will be made
                periodically as per the agreed schedule. VTTCABS PRIVATE LIMITED
                reserves the right to adjust payout schedules as needed.
              </li>
            </ul>
          </section>

          <section class="mb-4">
            <h2>6. Termination</h2>
            <ul>
              <li>
                <strong>Termination by Vendor:</strong> Vendors may terminate
                their agreement with VTTCABS PRIVATE LIMITED at any time by
                providing written notice.
              </li>
              <li>
                <strong>Termination by Company:</strong> VTTCABS PRIVATE LIMITED
                reserves the right to terminate or suspend vendor registration
                at any time, without notice, for reasons including, but not
                limited to, non-compliance with these terms, legal issues, or
                poor service performance.
              </li>
            </ul>
          </section>

          <section class="mb-4">
            <h2>7. Confidentiality</h2>
            <p>
              Vendors agree not to disclose any confidential information related
              to VTTCABS PRIVATE LIMITED, its platform, or customers, except as
              required by law.
            </p>
          </section>

          <section class="mb-4">
            <h2>8. Data Privacy</h2>
            <p>
              VTTCABS PRIVATE LIMITED will handle all personal data in
              accordance with its Privacy Policy. Vendors are responsible for
              safeguarding any personal data they collect during service
              provision.
            </p>
          </section>

          <section class="mb-4">
            <h2>9. Liability</h2>
            <p>
              VTTCABS PRIVATE LIMITED is not liable for any damages, losses, or
              legal actions arising from vendor actions. Vendors agree to
              indemnify and hold harmless VTTCABS PRIVATE LIMITED from any
              claims arising from their services.
            </p>
          </section>

          <section class="mb-4">
            <h2>10. Amendments</h2>
            <p>
              VTTCABS PRIVATE LIMITED reserves the right to amend these terms
              and conditions at any time. Vendors will be notified of any
              changes, and continued use of the platform constitutes acceptance
              of the revised terms.
            </p>
          </section>

          <section class="mb-4">
            <h2>11. Governing Law</h2>
            <p>
              These terms and conditions are governed by the laws of [Insert
              Jurisdiction]. Any disputes arising from these terms will be
              settled in the courts of [Insert Jurisdiction].
            </p>
          </section>

          <section class="mb-4">
            <h2>12. Registration and Joining Fee</h2>
            <p>
              <strong>Joining Fee:</strong> A non-refundable fee of Rs.2000 is
              required upon registration.
            </p>
          </section>

          <section class="mb-4">
            <h2>13. Wallet Recharge and Maintenance</h2>
            <ul>
              <li>
                <strong>Minimum Wallet Balance:</strong> Vendors must maintain a
                minimum wallet balance of Rs.800 at all times.
              </li>
              <li>
                <strong>Automatic Suspension:</strong> If the wallet balance
                falls below Rs.800, the vendor account will be automatically
                suspended until the balance is recharged.
              </li>
            </ul>
          </section>

          <section class="mb-4">
            <h2>14. Penalties and Charges</h2>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Penalty/Charge</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Joining Fee</td>
                  <td>Rs.2000 (Non-refundable)</td>
                </tr>
                <tr>
                  <td>Minimum Wallet Balance Requirement</td>
                  <td>Rs.800 minimum balance</td>
                </tr>
                <tr>
                  <td>Wallet Balance Below Rs.800</td>
                  <td>Automatic suspension until recharged</td>
                </tr>
                <tr>
                  <td>Cancellation After Pickup</td>
                  <td>Rs.500 penalty</td>
                </tr>
                <tr>
                  <td>Failure to Maintain Vehicle Cleanliness</td>
                  <td>Rs.300 penalty</td>
                </tr>
                <tr>
                  <td>Late Arrival (More than 10 minutes)</td>
                  <td>Rs.200 penalty</td>
                </tr>
                <tr>
                  <td>Non-Compliance with Booking Protocols</td>
                  <td>Rs.500 penalty</td>
                </tr>
                <tr>
                  <td>Repeated Offenses</td>
                  <td>Account suspension or termination</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section class="mb-4">
            <h2>15. Account Suspension</h2>
            <ul>
              <li>
                <strong>Automatic Suspension:</strong> Accounts with a wallet
                balance below Rs.800 will be automatically suspended until
                recharged.
              </li>
              <li>
                <strong>Cancellation Policy:</strong> Cancellations after pickup
                will incur a penalty of Rs.500, deducted directly from the
                vendor's wallet.
              </li>
            </ul>
          </section>

          <section class="mb-4">
            <h2>16. Additional Terms</h2>
            <p>
              Vendors are responsible for adhering to VTTCABS operational
              standards and protocols. VTTCABS reserves the right to update
              terms and conditions at any time with prior notice to the vendors.
            </p>
          </section>

          <footer class="text-center mt-5">
            <p>
              By completing the registration process, you acknowledge that you
              have read, understood, and agree to be bound by these terms and
              conditions.
            </p>
          </footer>
        </div>
      </div>
      <HomeFooter />
    </>
  );
}

export default PrivacyPolicy;
