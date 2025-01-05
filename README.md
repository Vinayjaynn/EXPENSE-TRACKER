Personal Finance Tracker

A simple and interactive web application built with React to help users manage their finances by tracking income, expenses, and savings. This app allows users to add, edit, and delete their expenses, update income, and see real-time calculations of their savings. Additionally, it features user-friendly input validation and provides visual feedback with notifications for better user experience.

Features
	•	Income Management: Users can add, edit, and update their income.
	•	Expense Management: Users can add, edit, delete, and track their expenses.
	•	Savings Calculation: The app automatically calculates savings by subtracting   total expenses from income.
	•	Input Validation: The app ensures that only positive amounts are entered for income and expenses.
	•	Real-time Feedback: Users are alerted with notifications if they enter negative values or if they exceed their savings.
	•	Sticky Footer: A footer is always visible at the bottom of the page.
	•	Responsive Design: The app is designed to be mobile-friendly.

Technologies Used
	•	React: For building the user interface and handling state.
	•	React Toastify: For displaying toast notifications for user feedback.
	•	Tailwind CSS: For styling and responsive design.
	•	JavaScript (ES6): For writing the main logic of the application.

Installation

Prerequisites

Ensure that you have the following installed on your system:
	•	Node.js: Download and install from Node.js Official Website.

Steps
	1.	Clone the repository to your local machine:
        git clone https://github.com/your-username/personal-finance-tracker.git

    2.	Navigate to the project directory:
        cd personal-finance-tracker
    
    3.	Install the required dependencies:
        npm install

    4.	Start the application:
        npm start
    
    The app will open in your default browser at http://localhost:3000.

How to Use

	1.	Add Income: Enter the income amount in the income section and click “Save”.
	2.	Add Expense: Enter a description and amount for the expense, and click “Add Expense”.
	3.	Edit Income: Click “Edit” next to your income, modify it, and click “Save”.
	4.	Edit Expense: Click the “Edit” button next to any expense to modify it.
	5.	Delete Expense: Click the “Delete” button next to any expense to remove it from the list.
	6.	View Savings: Your savings will be displayed, automatically calculated from the income and expenses.

    Acknowledgements
	•	React for the UI framework.
	•	React Toastify for notifications.
	•	Tailwind CSS for styling.