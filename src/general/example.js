//Default Page Tour
function StartDashboardTour() {

    var tour = new Tour({
        storage: false
    });

    tour.addSteps([
        {
            element: ".start-tour",
            placement: "left",
            //backdrop: "true",
            title: "Welcome to Tour",
            content: "Our system is developed around our clients keeping their most needed forms at the tips of their fingers.<br/>For a first time user it can be quite overwhelming, that is why we created this walkthrough to help you use the system."
        },
        {
            element: ".tour-default.tour-step-one",
            placement: "bottom",
            title: "Dashboard - Files",
            content: "Files have records of the claims. If they are Pending - In Process - Require More Information - Completed."
        },
        {
            element: ".tour-default.tour-step-two",
            placement: "bottom",
            title: "Dashboard - New Order",
            content: "To create a new request you can easily click on this icon and you will be taken directly to a new form."
        },
        {
            element: ".appointment-btn",
            placement: "bottom",
            title: "Dashboard - Navigation",
            content: "You can also click here to create a new request any time while using the application."
        },
        {
            element: ".tour-default.tour-step-three",
            placement: "bottom",
            title: "Dashboard - Upload Record",
            content: "Clicking this icon will open the upload form where you can upload the result files."
        },
        {
            element: ".tour-default.tour-step-four",
            placement: "bottom",
            title: "Dashboard - Settings",
            content: "In the Settings section you will find information related to your profile."
        },
        {
            element: ".tour-default.tour-step-five",
            placement: "bottom",
            title: "Dashboard - Support",
            content: "In this section you can contact the developer of the webapp directly for support or other inquiries."
        },
        {
            element: ".tour-default.tour-step-six",
            placement: "bottom",
            title: "Dashboard - Manage Users",
            content: "To Create - Update - Delete Members you can easily click on this icon."
        },
        {
            element: ".tour-default.tour-step-seven",
            placement: "bottom",
            title: "Dashboard - Manage Exams",
            content: "This is the place to Add New Exams or changes to current examinations."
        },
        {
            element: ".tour-default.tour-step-eight",
            placement: "bottom",
            title: "Dashboard - Manage Insurance",
            content: "This Icon will take you to the Manage Insurance Page where you can Add - Update - Delete related information."
        },
        {
            element: ".tour-default.tour-step-nine",
            placement: "top",
            title: "Dashboard - Information Panel",
            content: "This panel has a quick view of the orders and how you are performing."
        },
        {
            element: ".navbar-collapse",
            placement: "bottom",
            title: "Dashboard - Navigation",
            content: "The most important icons on dashboard could be found in the navigation area for quick access. You can always return to dashboard by clicking the <i class='fa fa-home'></i> icon."
        },
        {
            element: ".logout",
            placement: "bottom",
            title: "Dashboard - Navigation",
            content: "For security reasons always remember to log out after you are ready from your session. We automatically log you out every 24 hours."
        },
        //logout
        {
            element: ".tour-default.tour-step-ten",
            placement: "left",
            title: "Dashboard - Help Button",
            content: "We are alwats here to assist you.<br/>If you need more specific help please do not hesitate contacting your Service Provider."
        },
    ]);

    // Initialize the tour
    tour.init();

    // Start the tour
    tour.start();
}
