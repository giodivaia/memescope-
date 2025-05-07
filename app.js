class TwitterServiceTester {
    constructor() {
        this.apiKey = '';
        this.testResults = [];
        this.charts = {};
        this.services = [{ service: 1, name: 'Twitter Likes', type: 'Default' }];
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // API Configuration Form
        document.getElementById('apiConfigForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleApiConfig();
        });

        // Toggle API Key Visibility
        document.getElementById('toggleApiKey').addEventListener('click', () => {
            const apiKeyInput = document.getElementById('apiKey');
            const type = apiKeyInput.type === 'password' ? 'text' : 'password';
            apiKeyInput.type = type;
        });

        // Test Configuration Form
        document.getElementById('testConfigForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleTestConfig();
        });

        // Sort Buttons
        document.getElementById('sortBySpeed').addEventListener('click', () => {
            this.sortResults('speed');
        });

        document.getElementById('sortByEffectiveness').addEventListener('click', () => {
            this.sortResults('effectiveness');
        });
    }

    async handleApiConfig() {
        const apiKey = document.getElementById('apiKey').value;
        if (!apiKey) {
            this.showToast('Please enter an API key', 'error');
            return;
        }

        try {
            this.setLoading(true);
            this.apiKey = apiKey;
            
            // Simulate API validation
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if (apiKey === '66f86c757348f33d9eba19deb92af3b7') {
                this.showToast('API Key validated. Balance: $50.00 USD', 'success');
                
                // Enable test configuration form
                document.getElementById('testConfigForm').querySelectorAll('input, select, button').forEach(el => {
                    el.disabled = false;
                });
            } else {
                throw new Error('Invalid API key');
            }
        } catch (error) {
            this.apiKey = '';
            document.getElementById('apiKey').value = '';
            this.showToast(error.message, 'error');
        } finally {
            this.setLoading(false);
        }
    }

    async handleTestConfig() {
        const config = {
            tweet_url: document.getElementById('tweetUrl').value,
            quantity: parseInt(document.getElementById('likesCount').value),
            testCount: parseInt(document.getElementById('testCount').value),
            runMode: document.getElementById('runMode').value
        };

        if (!this.apiKey) {
            this.showToast('Please configure API Key first', 'error');
            return;
        }

        try {
            this.setLoading(true);
            await this.runTests(config);
        } catch (error) {
            this.showToast(error.message, 'error');
        } finally {
            this.setLoading(false);
        }
    }

    async runTests(config) {
        const tests = Array(config.testCount).fill().map((_, index) => ({
            id: `test-${index + 1}`,
            tweet_url: config.tweet_url,
            quantity: config.quantity
        }));

        if (config.runMode === 'parallel') {
            await Promise.all(tests.map(test => this.runSingleTest(test)));
        } else {
            for (const test of tests) {
                await this.runSingleTest(test);
            }
        }

        this.updateCharts();
    }

    async runSingleTest(test) {
        const startTime = new Date();
        
        try {
            // Simulate order placement
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate status checks with random results
            const deliveredLikes = Math.floor(test.quantity * (0.8 + Math.random() * 0.2));
            const deliveryTime = (2 + Math.random() * 5).toFixed(1);
            const status = deliveredLikes >= test.quantity ? 'complete' : 
                          deliveredLikes > 0 ? 'partial' : 'failed';

            const testResult = {
                id: test.id,
                startTime,
                deliveryTime,
                status,
                orderedLikes: test.quantity,
                deliveredLikes,
                effectiveness: ((deliveredLikes / test.quantity) * 100).toFixed(1)
            };

            this.testResults.push(testResult);
            this.updateResultsTable();
            
            // Show notification
            this.showToast(`Test ${test.id} completed: ${status}`, status === 'complete' ? 'success' : 'warning');
        } catch (error) {
            const testResult = {
                id: test.id,
                startTime,
                deliveryTime: ((new Date() - startTime) / 1000).toFixed(1),
                status: 'failed',
                orderedLikes: test.quantity,
                deliveredLikes: 0,
                effectiveness: '0.0'
            };

            this.testResults.push(testResult);
            this.updateResultsTable();
            this.showToast(`Test ${test.id} failed`, 'error');
        }
    }

    updateResultsTable() {
        const tbody = document.getElementById('resultsTableBody');
        tbody.innerHTML = this.testResults.map(result => `
            <tr>
                <td>${result.id}</td>
                <td>${result.startTime.toLocaleTimeString()}</td>
                <td>${result.deliveryTime}s</td>
                <td class="status-${result.status}">${result.status}</td>
                <td>${result.orderedLikes}</td>
                <td>${result.deliveredLikes}</td>
                <td>${result.effectiveness}%</td>
            </tr>
        `).join('');
    }

    updateCharts() {
        this.updateDeliveryTimeChart();
        this.updateEffectivenessChart();
    }

    updateDeliveryTimeChart() {
        const ctx = document.getElementById('deliveryTimeChart').getContext('2d');
        
        if (this.charts.deliveryTime) {
            this.charts.deliveryTime.destroy();
        }

        this.charts.deliveryTime = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.testResults.map(r => r.id),
                datasets: [{
                    label: 'Delivery Time (seconds)',
                    data: this.testResults.map(r => r.deliveryTime),
                    backgroundColor: 'rgba(29, 161, 242, 0.5)',
                    borderColor: 'rgba(29, 161, 242, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    updateEffectivenessChart() {
        const ctx = document.getElementById('effectivenessChart').getContext('2d');
        
        if (this.charts.effectiveness) {
            this.charts.effectiveness.destroy();
        }

        this.charts.effectiveness = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.testResults.map(r => r.id),
                datasets: [{
                    label: 'Effectiveness (%)',
                    data: this.testResults.map(r => r.effectiveness),
                    backgroundColor: 'rgba(23, 191, 99, 0.5)',
                    borderColor: 'rgba(23, 191, 99, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    sortResults(criteria) {
        if (criteria === 'speed') {
            this.testResults.sort((a, b) => a.deliveryTime - b.deliveryTime);
        } else if (criteria === 'effectiveness') {
            this.testResults.sort((a, b) => b.effectiveness - a.effectiveness);
        }

        this.updateResultsTable();
        this.updateCharts();
    }

    setLoading(isLoading) {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            if (isLoading) {
                form.classList.add('loading');
                form.querySelectorAll('button').forEach(btn => btn.disabled = true);
            } else {
                form.classList.remove('loading');
                form.querySelectorAll('button').forEach(btn => btn.disabled = false);
            }
        });
    }

    showToast(message, type) {
        const toastContainer = document.querySelector('.toast-container') || (() => {
            const container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
            return container;
        })();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
            if (!toastContainer.hasChildNodes()) {
                toastContainer.remove();
            }
        }, 3000);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new TwitterServiceTester();
}); 