"use client";
import React, { useState } from "react";
import Head from "next/head";
import { HomeFooter, HomeHeader } from "@/components";
import { cdnUrl } from "@/util/server";

const PartnerDelete = () => {
  const [partnerId, setPartnerId] = useState("");
  const [feedback, setFeedback] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!partnerId) {
      setFeedback({
        type: "danger",
        message: "Please enter a valid Partner ID.",
      });
      return;
    }

    try {
      // Simulate API call to delete the partner/vendor
      const response = await fetch("/api/delete-partner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ partnerId }),
      });

      if (response.ok) {
        setFeedback({
          type: "success",
          message: "Partner deleted successfully.",
        });
        setPartnerId(""); // Clear the input field
      } else {
        const data = await response.json();
        setFeedback({
          type: "danger",
          message: data.message || "Failed to delete partner.",
        });
      }
    } catch (error) {
      setFeedback({
        type: "danger",
        message: "An error occurred while deleting the partner.",
      });
    }
  };

  return (
    <>
      {/* <Head>
        <title>Delete Partner</title>
        <meta name="description" content="Delete a partner or vendor." />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      <HomeHeader logo={cdnUrl("img/vtt-cabs-partner.svg")} bg="transparent" />
      <section>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow">
                <div className="card-header bg-danger text-white">
                  <h3 className="card-title text-center">Delete Partner</h3>
                </div>
                <div className="card-body">
                  {feedback && (
                    <div
                      className={`alert alert-${feedback.type} alert-dismissible fade show`}
                      role="alert"
                    >
                      {feedback.message}
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setFeedback(null)}
                      ></button>
                    </div>
                  )}
                  <form onSubmit={handleDelete}>
                    <div className="mb-3">
                      <label htmlFor="partnerId" className="form-label">
                        Partner ID
                      </label>
                      <input
                        type="text"
                        id="partnerId"
                        className="form-control"
                        value={partnerId}
                        onChange={(e) => setPartnerId(e.target.value)}
                        placeholder="Enter Partner ID"
                        required
                      />
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-danger">
                        Confirm Delete
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HomeFooter />
    </>
  );
};

export default PartnerDelete;
