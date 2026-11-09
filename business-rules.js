/* SÒL PLUS — règ biznis san koneksyon ak lajan reyèl.
   Backend la dwe revalide tout règ sa yo anvan nenpòt tranzaksyon. */
window.SOL_PLUS_RULES = Object.freeze({
  maxMembers: 100,
  maxDuration: Object.freeze({ weekly: 50, monthly: 60 }),
  maxContribution: Object.freeze({
    daily: 20000,
    weekly: 30000,
    monthly: 50000
  }),
  commissionRate: 0.12,
  // Sou depo: 12% soti nan kantite brit; rès la antre nan SÒL.
  netDeposit(grossAmount) {
    const amount = Number(grossAmount);
    if (!Number.isFinite(amount) || amount < 0) throw new Error("Montan depo a pa valab.");
    return Math.round(amount * (1 - this.commissionRate) * 100) / 100;
  },
  // Sou PAYROLL: manm nan resevwa 88% kantite brit li dwe touche.
  netPayroll(grossPayout) {
    const amount = Number(grossPayout);
    if (!Number.isFinite(amount) || amount < 0) throw new Error("Montan PAYROLL la pa valab.");
    return Math.round(amount * (1 - this.commissionRate) * 100) / 100;
  }
});
