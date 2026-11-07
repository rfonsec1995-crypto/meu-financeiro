MEU FINANCEIRO — VERSÃO LOCAL PARA IPHONE

- Não usa Supabase, login, autenticação ou banco de dados na nuvem.
- Os lançamentos e saldos ficam no armazenamento local do navegador instalado no iPhone.
- O app pode funcionar offline depois de aberto e armazenado em cache.
- Exporte backups periodicamente pelo botão “Exportar backup”. Guarde o JSON em Arquivos/iCloud Drive.
- Para restaurar, use “Restaurar backup”.
- Para instalar: abra o endereço HTTPS no Safari > Compartilhar > Adicionar à Tela de Início.

A hospedagem HTTPS (por exemplo, Netlify) ainda entrega os arquivos do aplicativo. Os dados financeiros não são enviados para essa hospedagem.

- O visual do aplicativo muda automaticamente entre claro e escuro conforme o tema do iPhone.
- Limitação do iOS: o ícone instalado na Tela de Início é estático e não troca automaticamente com o tema. O ícone atual permanece; para mudar o desenho, é necessário substituir o ícone e reinstalar/adicionar o atalho novamente.
- Ao publicar esta atualização no mesmo endereço Netlify, os dados locais existentes devem permanecer, desde que os dados do Safari/site não sejam apagados. Faça um backup antes da atualização por segurança.
