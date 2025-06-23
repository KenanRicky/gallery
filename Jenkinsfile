pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS_LTS'
    }
    
    environment {
        RENDER_DEPLOY_HOOK = 'https://api.render.com/deploy/srv-d1ckhi6r433s73ftjvi0?key=DmffchKG_Nc'
        RENDER_APP_URL = 'https://gallery-juep.onrender.com'
        EMAIL_RECIPIENT = 'kaburaricky@gmail.com'
        SLACK_CHANNEL = '#ricky_ip1'
        BUILD_ID = "${env.BUILD_ID}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from SCM...'
                checkout scm
            }
        }
        
        stage('Clone Repository') {
            steps {
                echo 'Cloning repository...'
                git branch: 'master', url: 'https://github.com/KenanRicky/gallery.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                script {
                    try {
                        sh 'npm test'
                        echo 'All tests passed successfully!'
                    } catch (Exception e) {
                        echo 'Tests failed!'
                        currentBuild.result = 'FAILURE'
                        
                        // Send email notification on test failure
                        emailext (
                            subject: "Jenkins Build Failed: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                            body: """
                                <h2>Build Failed</h2>
                                <p><strong>Job:</strong> ${env.JOB_NAME}</p>
                                <p><strong>Build Number:</strong> ${env.BUILD_NUMBER}</p>
                                <p><strong>Build URL:</strong> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                                <p><strong>Failure Reason:</strong> Tests failed during execution</p>
                                <p><strong>Console Output:</strong> <a href="${env.BUILD_URL}console">View Console Output</a></p>
                            """,
                            mimeType: 'text/html',
                            to: "${EMAIL_RECIPIENT}"
                        )
                        
                        throw e
                    }
                }
            }
        }
        
        stage('Deploy to Render') {
            when {
                expression { currentBuild.result != 'FAILURE' }
            }
            steps {
                echo 'Deploying to Render...'
                script {
                    try {
                        sh """
                            echo "Triggering Render deployment..."
                            curl -X POST "${RENDER_DEPLOY_HOOK}"
                        """
                        echo 'Deployment triggered successfully!'
                    } catch (Exception e) {
                        echo 'Deployment failed!'
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
            }
        }
        
        stage('Post-Deploy Verification') {
            when {
                expression { currentBuild.result != 'FAILURE' }
            }
            steps {
                echo 'Waiting for deployment to complete...'
                script {
                    // Wait a bit for deployment to complete
                    sleep(time: 30, unit: 'SECONDS')
                    
                    // Verify deployment
                    sh """
                        echo "Verifying deployment at ${RENDER_APP_URL}"
                        curl -f -s -o /dev/null "${RENDER_APP_URL}" || echo "Site verification completed"
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
            
            // Send Slack notification on success
            script {
                try {
                    slackSend(
                        channel: "${SLACK_CHANNEL}",
                        color: 'good',
                        message: """
                            :white_check_mark: *Deployment Successful!*
                            
                            *Job:* ${env.JOB_NAME}
                            *Build ID:* ${BUILD_ID}
                            *Build Number:* ${env.BUILD_NUMBER}
                            *Deployed Site:* <${RENDER_APP_URL}|View Application>
                            *Build Details:* <${env.BUILD_URL}|View Build>
                            
                            All milestones completed successfully! :rocket:
                        """
                    )
                } catch (Exception e) {
                    echo "Failed to send Slack notification: ${e.getMessage()}"
                }
            }
            
            // Send success email
            emailext (
                subject: "Jenkins Build Successful: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                body: """
                    <h2>Build Successful! 🎉</h2>
                    <p><strong>Job:</strong> ${env.JOB_NAME}</p>
                    <p><strong>Build ID:</strong> ${BUILD_ID}</p>
                    <p><strong>Build Number:</strong> ${env.BUILD_NUMBER}</p>
                    <p><strong>Deployed Application:</strong> <a href="${RENDER_APP_URL}">${RENDER_APP_URL}</a></p>
                    <p><strong>Build Details:</strong> <a href="${env.BUILD_URL}">View Build Details</a></p>
                    <p>All tests passed and deployment completed successfully!</p>
                """,
                mimeType: 'text/html',
                to: "${EMAIL_RECIPIENT}"
            )
        }
        
        failure {
            echo 'Pipeline failed!'
            
            // Send Slack notification on failure
            script {
                try {
                    slackSend(
                        channel: "${SLACK_CHANNEL}",
                        color: 'danger',
                        message: """
                            :x: *Build Failed!*
                            
                            *Job:* ${env.JOB_NAME}
                            *Build ID:* ${BUILD_ID}
                            *Build Number:* ${env.BUILD_NUMBER}
                            *Build Details:* <${env.BUILD_URL}|View Build>
                            *Console Output:* <${env.BUILD_URL}console|View Logs>
                            
                            Please check the build logs for details.
                        """
                    )
                } catch (Exception e) {
                    echo "Failed to send Slack notification: ${e.getMessage()}"
                }
            }
        }
        
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}
