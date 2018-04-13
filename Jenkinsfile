pipeline {
  agent any
  environment { 
    GITHUB_ORG = 'virtualjoy'
    GITHUB_REPO = 'SensestarLiveWeb'
  }

  stages {

    stage('Preparing') {
      steps {
        script {
          githubNotify account: env.GITHUB_ORG, context: 'test', credentialsId: 'github', description: 'pending...', gitApiUrl: '', repo: GITHUB_REPO, sha: env.GIT_COMMIT, status: 'PENDING', targetUrl: ''
          githubNotify account: env.GITHUB_ORG, context: 'lint', credentialsId: 'github', description: 'pending...', gitApiUrl: '', repo: GITHUB_REPO, sha: env.GIT_COMMIT, status: 'PENDING', targetUrl: ''
          githubNotify account: env.GITHUB_ORG, context: 'build', credentialsId: 'github', description: 'pending...', gitApiUrl: '', repo: GITHUB_REPO, sha: env.GIT_COMMIT, status: 'PENDING', targetUrl: ''
        }
      }
    }

    stage('Test') {
      agent {
        docker {
          image 'node:9'
          args '-p 3000:3000 -u root'
        }   
      }
      steps {
        script{
          try{
            githubNotify account: env.GITHUB_ORG, context: 'test', credentialsId: 'github', description: 'testing...', gitApiUrl: '', repo: GITHUB_REPO, sha: env.GIT_COMMIT, status: 'PENDING', targetUrl: ''
            sh 'npm install'
            sh 'CI=true npm run test:ci -- --coverage --env jsdom'
            step([$class: 'CoberturaPublisher',
              autoUpdateHealth: false,
              autoUpdateStability: false,
              coberturaReportFile: 'coverage/cobertura-coverage.xml',
              failUnhealthy: false,
              failUnstable: false,
              maxNumberOfBuilds: 0,
              onlyStable: false,
              sourceEncoding: 'ASCII',
              zoomCoverageChart: false])
            junit 'junit.xml'
            sh "cd coverage&&ls"
            stash includes: 'coverage/*', name: 'coverageReports'
            sh "rm -rf coverage"
            githubNotify account: env.GITHUB_ORG, context: 'test', credentialsId: 'github', description: 'test PASSed', gitApiUrl: '', repo: GITHUB_REPO, sha: env.GIT_COMMIT, status: 'SUCCESS', targetUrl: ''
          } catch(ex){
            githubNotify account: env.GITHUB_ORG, context: 'test', credentialsId: 'github', description: 'Failed to pass tests', gitApiUrl: '', repo: GITHUB_REPO, sha: env.GIT_COMMIT, status: 'FAILURE', targetUrl: ''
            error("Test stage FAILED")
          }
        }
      }
    }

    stage('Lint'){
       agent {
        docker {
          image 'node:9'
          args '-p 3000:3000 -u root'
        }   
      }
      steps{
        script{
          try{
          githubNotify account: env.GITHUB_ORG, context: 'lint', credentialsId: 'github', description: 'linting...', gitApiUrl: '', repo: GITHUB_REPO, sha: env.GIT_COMMIT, status: 'PENDING', targetUrl: '' 
          sh 'npm run lint'
          githubNotify account: env.GITHUB_ORG, context: 'lint', credentialsId: 'github', description: 'building...', gitApiUrl: '', repo: GITHUB_REPO, sha: env.GIT_COMMIT, status: 'SUCCESS', targetUrl: ''
          }catch (ex){
            githubNotify account: env.GITHUB_ORG, context: 'lint', credentialsId: 'github', description: 'lint failed', gitApiUrl: '', repo: GITHUB_REPO, sha: env.GIT_COMMIT, status: 'ERROR', targetUrl: ''
            error("Lint stage FAILED")
          }
        }
      }
    }

    stage('Build') {
      agent {
        docker {
          image 'node:9'
          args '-p 3000:3000 -u root'
        }   
      }
      steps {
        script{
          try{
            githubNotify account: env.GITHUB_ORG, context: 'build', credentialsId: 'github', description: 'building...', gitApiUrl: '', repo: GITHUB_REPO, sha: env.GIT_COMMIT, status: 'PENDING', targetUrl: ''
            sh 'npm run build'
            githubNotify account: env.GITHUB_ORG, context: 'build', credentialsId: 'github', description: 'build successfully', gitApiUrl: '', repo: GITHUB_REPO, sha: env.GIT_COMMIT, status: 'SUCCESS', targetUrl: ''
          } catch(ex){
            githubNotify account: env.GITHUB_ORG, context: 'build', credentialsId: 'github', description: 'build failed', gitApiUrl: '', repo: GITHUB_REPO, sha: env.GIT_COMMIT, status: 'ERROR', targetUrl: ''
            error("Build stage FAILED")
          }
        }
      }
    }

    stage('SonarQube analysis for PR') {
      when {
        not { environment name: 'CHANGE_TARGET', value: null }
      }
      steps {
        script{
          def scannerHome = tool name: 'SonarQube_Scanner_3.0.3.778'
          def reFormatLCOV = "sed -i 's|SF:/.*/src/|SF:src/|g' coverage/lcov.info"
          withCredentials([string(credentialsId: 'githubtoken', variable: 'TOKEN')]) {
            withSonarQubeEnv('sonarQube') {
              unstash 'coverageReports'
              sh "${reFormatLCOV}"
              sh "${scannerHome}/bin/sonar-scanner -Dsonar.github.pullRequest=${env.CHANGE_ID} \
              -Dsonar.github.repository=${GITHUB_ORG}/${GITHUB_REPO} \
              -Dsonar.github.oauth=${TOKEN} \
              -Dsonar.analysis.mode=issues"
            }
          }
        }
      }
    }

    stage('SonarQube analysis for merge') {
      when {
        environment name: 'CHANGE_TARGET', value: null 
      }
      steps {
        sh "whoami"
        sh "sudo rm -rf coverage"
        sh "ls"
        script{
          def scannerHome = tool name: 'SonarQube_Scanner_3.0.3.778'
          def reFormatLCOV = "sed -i 's|SF:/.*/src/|SF:src/|g' coverage/lcov.info"
          withCredentials([string(credentialsId: 'githubtoken', variable: 'TOKEN')]) {
            withSonarQubeEnv('sonarQube') {
              unstash 'coverageReports'
              sh "cd coverage&&ls"
              sh "${reFormatLCOV}"
              sh "${scannerHome}/bin/sonar-scanner -Dsonar.analysis.mode=publish \
              -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info"
            }
          }
          def qg = waitForQualityGate()
          if (qg.status != 'OK') {
            error "Pipeline aborted due to quality gate failure: ${qg.status}"
          }
        }
      }
    }
    
    stage('Record Coverage') {
      when { branch 'master' }
      steps {
        script {
          currentBuild.result = 'SUCCESS'
        }
        step([$class: 'MasterCoverageAction', scmVars: [GIT_URL: env.GIT_URL, GIT_BRANCH: env.GIT_BRANCH, GIT_COMMIT: env.GIT_COMMIT]])
      }
    }
    
    stage('PR Coverage to Github') {
      when { not { environment name: 'CHANGE_TARGET', value: null } }
      steps {
        script {
          currentBuild.result = 'SUCCESS'
        }
        step([$class: 'CompareCoverageAction', scmVars: [GIT_URL: env.GIT_URL, GIT_BRANCH: env.GIT_BRANCH, GIT_COMMIT: env.GIT_COMMIT]])
      }
    }
  }
}
