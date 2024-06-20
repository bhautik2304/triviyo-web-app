"use client"
import { appRoutes } from "@/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const profilePath = [
    { title: "My profile", icon: "bi-person", path: appRoutes.profile.home },
    { title: "My Booking", icon: "bi-ticket-perforated", path: appRoutes.profile.booking },
    // { title: "Travelers", icon: "bi-people", path: appRoutes.profile.traveller },
    { title: "Vtt Money", icon: "bi-wallet", path: appRoutes.profile.money },
    { title: "Booking Help", icon: "bi-chat-dots", path: appRoutes.profile.help },
    { title: "Booking Reviews", icon: "bi-star", path: appRoutes.profile.reviews },
    { title: "Collected coupons", icon: "bi-gift", path: appRoutes.profile.coupons },
    { title: "Setting", icon: "bi-gear", path: appRoutes.profile.setting },
    { title: "Notification", icon: "bi-bell", path: appRoutes.profile.notification },
]

export const ProfileDashboardLink = () => {
    const route = usePathname()
    console.log(route);
    return (
        <>
            {
                profilePath.map((data) => (
                    <li class="nav-item">
                        <Link class={`nav-link ${route == data.path && "active"}`} href={data.path}><i class={`bi ${data.icon} fa-fw me-2`}></i>{data.title}</Link>
                    </li>
                ))
            }
        </>
    )
}






