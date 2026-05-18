import { Component, type ErrorInfo } from "react";
import type { ErrorBoundaryProps, ErrorBoundaryState } from "../types/common";
import styles from "../styles/ErrorBoundary.module.scss";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	state: ErrorBoundaryState = {
		hasError: false,
		error: null,
	};

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Log to console; in production, hook this up to your error tracker (Sentry, etc.)
		console.error("ErrorBoundary caught an error:", error, errorInfo);
		this.props.onError?.(error, errorInfo);
	}

	handleReset = () => {
		this.setState({ hasError: false, error: null });
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) return this.props.fallback;

			return (
				<div className={styles.errorContainer} role='alert'>
					<div className={styles.errorContent}>
						<h2 className={styles.errorTitle}>Something went wrong</h2>
						<p className={styles.errorMessage}>
							We're sorry — something went wrong on our end. Try again, or
							refresh the page if the problem persists.
						</p>
						{import.meta.env.DEV && this.state.error && (
							<details className={styles.errorDetails}>
								<summary>Error details (development only)</summary>
								<pre>{this.state.error.message}</pre>
								{this.state.error.stack && <pre>{this.state.error.stack}</pre>}
							</details>
						)}
						<div className={styles.errorActions}>
							<button
								type='button'
								onClick={this.handleReset}
								className={styles.errorButtonPrimary}
							>
								Try again
							</button>
							<button
								type='button'
								onClick={() => window.location.reload()}
								className={styles.errorButtonSecondary}
							>
								Refresh page
							</button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
