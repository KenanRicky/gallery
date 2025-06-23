pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS_LTS' // This should match the name you configured
    }
    
    environment {
        RENDER_DEPLOY_HOOK = credentials('https://api.render.com/deploy/srv-d1ckhi6r433s73ftjvi0?key=DmffchKG_Nc')
        RENDER_APP_URL = 'https://gallery-juep.onrender.com'
        EMAIL_RECIPIENT = 'kaburaricky@gmail.com'
        SLACK_CHANNEL = '#yourfirstname_ip1'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Clone code') {
            steps {
                git branch: 'master', url: 'https://github.com/KenanRicky/gallery.git'
            }
        }

        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    try {
                        sh 'npm test'
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
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
                script {
                    sh '''
                        echo "Triggering Render deployment..."
                        curl -X POST $RENDER_DEPLOY_HOOK
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
