import React from 'react'
import { Logo, Rights } from '@/components'

function HomeFooter() {
    return (
        <>
            <footer class="bg-dark pt-5">
                <div class="container">
                    {/* <!-- Row START --> */}
                    <div class="row g-4">

                        {/* <!-- Widget 1 START --> */}
                        <div class="col-lg-3">
                            {/* <!-- logo --> */}
                            <Logo />
                            <p class="my-3 text-body-secondary">Departure defective arranging rapturous did believe him all had supported.</p>
                            <p class="mb-2"><a href="tel:+918140599993" class="text-body-secondary text-primary-hover"><i class="bi bi-telephone me-2"></i>+91 81405 99993</a> </p>
                            <p class="mb-2"><a href="tel:+918140699993" class="text-body-secondary text-primary-hover"><i class="bi bi-telephone me-2"></i>+91 81406 99993</a> </p>
                            <p class="mb-0"><a href="mailto:contact@vttcabs.com" class="text-body-secondary text-primary-hover"><i class="bi bi-envelope me-2"></i>contact@vttcabs.com</a></p>
                        </div>
                        {/* <!-- Widget 1 END --> */}

                        {/* <!-- Widget 2 START --> */}
                        <div class="col-lg-8 ms-auto">
                            <div class="row g-4">
                                {/* <!-- Link block --> */}
                                <div class="col-6 col-md-3">
                                    <h5 class="text-white mb-2 mb-md-4">Booking</h5>
                                    <ul class="nav flex-column text-primary-hover">
                                        <li class="nav-item"><a class="nav-link text-body-secondary" href="#"><i class="fa-solid fa-car me-2"></i>Cabs</a></li>
                                        <li class="nav-item"><a class="nav-link text-body-secondary" href="#"><i class="fa-solid fa-hotel me-2"></i>Hotel</a></li>
                                        {/* <li class="nav-item"><a class="nav-link text-body-secondary" href="#"><i class="fa-solid fa-plane me-2"></i>Flight</a></li>
                                        <li class="nav-item"><a class="nav-link text-body-secondary" href="#"><i class="fa-solid fa-globe-americas me-2"></i>Tour</a></li> */}
                                    </ul>
                                </div>

                                {/* <!-- Link block --> */}
                                <div class="col-6 col-md-3">
                                    <h5 class="text-white mb-2 mb-md-4">Page</h5>
                                    <ul class="nav flex-column text-primary-hover">
                                        <li class="nav-item"><a class="nav-link text-body-secondary" href="#">About us</a></li>
                                        <li class="nav-item"><a class="nav-link text-body-secondary" href="#">Contact us</a></li>
                                        <li class="nav-item"><a class="nav-link text-body-secondary" href="#">News and Blog</a></li>
                                        {/* <li class="nav-item"><a class="nav-link text-body-secondary" href="#">Meet a Team</a></li> */}
                                    </ul>
                                </div>

                                {/* <!-- Link block --> */}
                                <div class="col-6 col-md-3">
                                    <h5 class="text-white mb-2 mb-md-4">Link</h5>
                                    <ul class="nav flex-column text-primary-hover">
                                        <li class="nav-item"><a class="nav-link text-body-secondary" href="#">Sign up</a></li>
                                        <li class="nav-item"><a class="nav-link text-body-secondary" href="#">Sign in</a></li>
                                        <li class="nav-item"><a class="nav-link text-body-secondary" href="#">Privacy Policy</a></li>
                                        <li class="nav-item"><a class="nav-link text-body-secondary" href="#">Terms</a></li>
                                        <li class="nav-item"><a class="nav-link text-body-secondary" href="#">Cookie</a></li>
                                        <li class="nav-item"><a class="nav-link text-body-secondary" href="#">Support</a></li>
                                    </ul>
                                </div>

                                {/* <!-- Link block --> */}
                                <div class="col-6 col-md-3">
                                    <h5 class="text-white mb-2 mb-md-4">Partner Link</h5>
                                    <ul class="nav flex-column text-primary-hover">
                                        <li class="nav-item"><a class="nav-link text-body-secondary" href="#">Cab Listing</a></li>
                                        <li class="nav-item"><a class="nav-link text-body-secondary" href="#">Hotel Listing</a></li>
                                    </ul>
                                </div>


                            </div>
                        </div>
                        {/* <!-- Widget 2 END --> */}

                    </div>
                    {/* <!-- Row END --> */}

                    {/* <!-- Payment and card --> */}
                    <div class="row g-4 justify-content-between mt-0 mt-md-2">

                        {/* <!-- Payment card --> */}
                        <div class="col-sm-7 col-md-6 col-lg-4">
                            <h5 class="text-white mb-2">Payment & Security</h5>
                            <ul class="list-inline mb-0 mt-3">
                                <li class="list-inline-item"> <a href="#"><img src="assets/images/element/paypal.svg" class="h-30px" alt="" /></a></li>
                                <li class="list-inline-item"> <a href="#"><img src="assets/images/element/visa.svg" class="h-30px" alt="" /></a></li>
                                <li class="list-inline-item"> <a href="#"><img src="assets/images/element/mastercard.svg" class="h-30px" alt="" /></a></li>
                                <li class="list-inline-item"> <a href="#"><img src="assets/images/element/expresscard.svg" class="h-30px" alt="" /></a></li>
                            </ul>
                        </div>

                        {/* <!-- Social media icon --> */}
                        <div class="col-sm-5 col-md-6 col-lg-3 text-sm-end">
                            <h5 class="text-white mb-2">Follow us on</h5>
                            <ul class="list-inline mb-0 mt-3">
                                <li class="list-inline-item"> <a class="btn btn-sm px-2 bg-facebook mb-0" href="#"><i class="fab fa-fw fa-facebook-f"></i></a> </li>
                                <li class="list-inline-item"> <a class="btn btn-sm shadow px-2 bg-instagram mb-0" href="#"><i class="fab fa-fw fa-instagram"></i></a> </li>
                                <li class="list-inline-item"> <a class="btn btn-sm shadow px-2 bg-twitter mb-0" href="#"><i class="fab fa-fw fa-twitter"></i></a> </li>
                                <li class="list-inline-item"> <a class="btn btn-sm shadow px-2 bg-linkedin mb-0" href="#"><i class="fab fa-fw fa-linkedin-in"></i></a> </li>
                            </ul>
                        </div>
                    </div>

                    {/* <!-- Divider --> */}
                    <hr class="mt-4 mb-0" />

                    {/* <!-- Bottom footer --> */}
                    <div class="row">
                        <div class="container">
                            <div class="d-lg-flex justify-content-between align-items-center py-3 text-center text-lg-start">
                                {/* <!-- copyright text --> */}
                                <Rights />
                                {/* <!-- copyright links--> */}
                                <div class="nav mt-2 mt-lg-0">
                                    <ul class="list-inline text-primary-hover mx-auto mb-0">
                                        <li class="list-inline-item me-0"><a class="nav-link text-body-secondary py-1" href="#">Privacy policy</a></li>
                                        <li class="list-inline-item me-0"><a class="nav-link text-body-secondary py-1" href="#">Terms and conditions</a></li>
                                        <li class="list-inline-item me-0"><a class="nav-link text-body-secondary py-1 pe-0" href="#">Refund policy</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default HomeFooter