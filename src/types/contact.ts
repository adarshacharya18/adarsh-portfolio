export interface ContactLabels {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  success: string;
  error: string;
}

export interface ContactData {
  title: string;
  description: string;
  labels: ContactLabels;
}
